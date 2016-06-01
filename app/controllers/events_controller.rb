class EventsController < ApplicationController
  # No authentification needed to see events (can't see all elements)
  skip_before_action :authenticate_user!, :only => [:index]

  GET_ALL_EVENTS_QUERY =
    "SELECT to_char(events.date, 'Day') AS day_name,
            to_char(events.date, 'FMDD') AS day_number,
            to_char(events.date, 'FMMon') AS month,
            to_char(events.date, 'YYYY') AS year,
            to_char(events.date, 'FMDDth FMMonth YYYY') AS date,
            to_char(events.start_time, 'HH24:MI') AS start_time,
            to_char(events.end_time, 'HH24:MI') AS end_time,
            events.id,
            events.sport,
            events.location,
            events.needed,
            events.min_participants,
            events.university_location,
            users.first_name,
            users.last_name,
            university_mails.university_name,
            SUM(event_participants.participants) OVER (PARTITION BY event_participants.event_id) AS participants
     FROM events JOIN users ON events.user_id = users.id
                 JOIN university_mails ON users.email ILIKE ('%@' || university_mails.mail_extension)
                 JOIN event_participants ON events.id = event_participants.event_id;"

  def index
    @events = ActiveRecord::Base.connection.execute(GET_ALL_EVENTS_QUERY)

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
                            :participants => 1)

    render :nothing => true
  end
end
