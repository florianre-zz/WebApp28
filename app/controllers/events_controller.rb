class EventsController < ApplicationController
  # No authentification needed to see events (can't see all elements)
  skip_before_action :authenticate_user!, :only => [:index]

  def index

    if user_signed_in?

      get_all_events_signed_in_query =
        "WITH events_table AS
           (
            SELECT DISTINCT  to_char(events.date, 'Day') AS day_name,
                             to_char(events.date, 'FMDD') AS day_number,
                             to_char(events.date, 'FMMon') AS month,
                             to_char(events.date, 'YYYY') AS year,
                             to_char(events.date, 'YYYY/MM/DD') || ' ' || to_char(events.start_time, 'HH24:MI:SS') AS date,
                             to_char(events.start_time, 'HH24:MI') AS start_time,
                             to_char(events.end_time, 'HH24:MI') AS end_time,
                             events.id,
                             events.user_id AS creator_id,
                             events.sport,
                             events.location,
                             events.needed,
                             events.min_participants,
                             events.university_location,
                             events.additional_info,
                             sports.image_path,
                             users.first_name,
                             users.last_name,
                             university_mails.university_name,
                             SUM (CASE WHEN event_participants.confirmed THEN event_participants.participants ELSE 0 END) OVER (PARTITION BY event_participants.event_id) AS participants,
                             CASE WHEN EXISTS (SELECT *
                                               FROM event_participants
                                               WHERE event_participants.user_id = #{current_user.id})
                                  THEN 'joined' ELSE 'possible' END AS status
              FROM events JOIN users ON events.user_id = users.id
                          JOIN university_mails ON users.email ILIKE ('%@' || university_mails.mail_extension)
                          JOIN event_participants ON events.id = event_participants.event_id
                          JOIN sports ON sports.name = events.sport
             )
             SELECT *
             FROM events_table
             WHERE events_table.creator_id <> #{current_user.id};"

      @events = ActiveRecord::Base.connection.execute(get_all_events_signed_in_query)

    else

      get_all_events_signed_out_query =
          "SELECT DISTINCT to_char(events.date, 'Day') AS day_name,
                           to_char(events.date, 'FMDD') AS day_number,
                           to_char(events.date, 'FMMon') AS month,
                           to_char(events.date, 'YYYY') AS year,
                           to_char(events.date, 'YYYY/MM/DD') || ' ' || to_char(events.start_time, 'HH24:MI:SS') AS date,
                           to_char(events.start_time, 'HH24:MI') AS start_time,
                           to_char(events.end_time, 'HH24:MI') AS end_time,
                           events.id,
                           events.user_id AS creator_id,
                           events.sport,
                           events.location,
                           events.needed,
                           events.min_participants,
                           events.university_location,
                           events.additional_info,
                           sports.image_path,
                           users.first_name,
                           users.last_name,
                           university_mails.university_name,
                           SUM (CASE WHEN event_participants.confirmed THEN event_participants.participants ELSE 0 END) OVER (PARTITION BY event_participants.event_id) AS participants
           FROM events JOIN users ON events.user_id = users.id
                       JOIN university_mails ON users.email ILIKE ('%@' || university_mails.mail_extension)
                       JOIN event_participants ON events.id = event_participants.event_id
                       JOIN sports ON sports.name = events.sport;"

      @events = ActiveRecord::Base.connection.execute(get_all_events_signed_out_query)
    end

    respond_to do |format|
      format.json { render json: @events }
    end
  end

  def create
    current_user_id = current_user.id

    # Create new entry and store it in the events table of the database
    # Parameters of new event are given from the HTTP POST request
    new_event =
      Event.create(:sport => params[:sport],
                   :date => params[:date],
                   :start_time => params[:start_time],
                   :end_time => params[:end_time],
                   :university_location => params[:university_location],
                   :location => params[:location],
                   :needed => params[:needed] + 1,
                   :min_participants => params[:needed] + 1,
                   :additional_info => params[:additional_info],
                   :user_id => current_user_id)

    # Create new event participant and store it in the event_participants
    # table of the database
    # Parameters are given from current user id and created event id
    EventParticipant.create(:event_id => new_event.id,
                            :user_id => current_user_id,
                            :participants => 1,
                            :confirmed => true,
                            :message => "")

    render :nothing => true
  end
end
