class ProfileController < ApplicationController

  helper_method :resource_name, :resource, :devise_mapping

  def index
    @profile_link = "#"
    @new_event_link = "#"
    @dropdown_partial = "shared/logged_in_dropdown"

    get_user_events_query =
      "WITH events_table AS
       (
        SELECT DISTINCT to_char(events.date, 'Day') AS day_name,
                         to_char(events.date, 'FMDD') AS day_number,
                         to_char(events.date, 'FMMon') AS month,
                         to_char(events.date, 'YYYY') AS year,
                         to_char(events.date, 'YYYY-MM-DD') AS date,
                         to_char(events.start_time, 'HH24:MI') AS start_time,
                         to_char(events.end_time, 'HH24:MI') AS end_time,
                         events.id,
                         events.sport,
                         events.location,
                         events.needed,
                         events.min_participants,
                         events.university_location,
                         events.additional_info,
                         users.first_name,
                         users.last_name,
                         university_mails.university_name,
                         SUM (CASE WHEN event_participants.confirmed THEN event_participants.participants ELSE 0 END) OVER (PARTITION BY event_participants.event_id) AS participants,
                         event_participants.user_id
          FROM events JOIN users ON events.user_id = users.id
                      JOIN university_mails ON users.email ILIKE ('%@' || university_mails.mail_extension)
                      JOIN event_participants ON events.id = event_participants.event_id
         )
         SELECT *
         FROM events_table
         WHERE events_table.user_id = #{current_user.id};"

    @events = ActiveRecord::Base.connection.execute(get_user_events_query)

    respond_to do |format|
      format.json { render json: @events }
    end
  end

  # Helper methods
  def resource_name
    :user
  end

  def resource
    @resource ||= User.new
  end

  def devise_mapping
    @devise_mapping ||= Devise.mappings[:user]
  end
end
