class ProfileController < ApplicationController

  helper_method :resource_name, :resource, :devise_mapping

  def index
    @new_event_link = "#"
    @dropdown_partial = "shared/logged_in_dropdown"
    @profile = current_user
  end

  def update
    @user = User.find_by(id: params[:id])

    first_name = params[:first_name]
    if !first_name.blank?
      @user.update(first_name: first_name)
    end

    last_name = params[:last_name]
    if !last_name.blank?
      @user.update(last_name: last_name)
    end

    image = params[:image]
    if !image.nil?
      @user.update(image: image)
    end

    telephone_number = params[:telephone_number]
    if !telephone_number.blank?
      @user.update(telephone_number: telephone_number)
    end

    description = params[:description]
    if !description.blank?
      @user.update(description: description)
    end

    redirect_to '/profile'
  end

  def get_created_events

    get_created_events_query =
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
                         events.user_id,
                         events.sport,
                         events.location,
                         events.needed,
                         events.min_participants,
                         events.university_location,
                         events.additional_info,
                         (CASE WHEN events.level=1 THEN 'Beginner'
                              WHEN events.level=2 THEN 'Intermediate'
                              WHEN events.level=3 THEN 'Advanced'
                              ELSE 'All levels' END) AS level,
                         sports.image_path,
                         users.first_name,
                         users.last_name,
                         university_mails.university_name,
                         SUM (CASE WHEN event_participants.confirmed
                                   THEN event_participants.participants ELSE 0 END)
                              OVER (PARTITION BY event_participants.event_id) AS participants,
                         'confirmed' AS status
          FROM events JOIN users ON events.user_id = users.id
                      JOIN university_mails ON users.email ILIKE ('%@' || university_mails.mail_extension)
                      JOIN event_participants ON events.id = event_participants.event_id
                      JOIN sports ON sports.name = events.sport
         )
         SELECT *
         FROM events_table
         WHERE events_table.user_id = #{current_user.id};"

    @created_events = ActiveRecord::Base.connection.execute(get_created_events_query)

    respond_to do |format|
      format.json { render json: @created_events }
    end
  end

  def get_joined_events

    get_joined_events_query =
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
                         (CASE WHEN events.level=1 THEN 'Beginner'
                              WHEN events.level=2 THEN 'Intermediate'
                              WHEN events.level=3 THEN 'Advanced'
                              ELSE 'All levels' END) AS level,
                         sports.image_path,
                         users.first_name,
                         users.last_name,
                         university_mails.university_name,
                         SUM (CASE WHEN event_participants.confirmed THEN event_participants.participants ELSE 0 END) OVER (PARTITION BY event_participants.event_id) AS participants,
                         event_participants.user_id,
                         CASE WHEN event_participants.confirmed THEN 'confirmed' ELSE 'pending' END AS status
          FROM events JOIN users ON events.user_id = users.id
                      JOIN university_mails ON users.email ILIKE ('%@' || university_mails.mail_extension)
                      JOIN event_participants ON events.id = event_participants.event_id
                      JOIN sports ON sports.name = events.sport
         )
         SELECT *
         FROM events_table
         WHERE events_table.user_id = #{current_user.id}
         AND events_table.creator_id <> #{current_user.id};"

    @joined_events = ActiveRecord::Base.connection.execute(get_joined_events_query)

    respond_to do |format|
      format.json { render json: @joined_events }
    end
  end

  def get_event_join_demands
    event_id = params[:event_id]
    current_user_id = current_user.id

    get_event_join_demands_query =
      "SELECT users.id,
              users.first_name,
              users.last_name,
              university_mails.university_name,
              event_participants.participants,
              event_participants.message,
              CASE WHEN event_participants.confirmed = true
                   THEN 'true'
                   ELSE 'false'
                   END AS confirmed
       FROM users JOIN university_mails ON users.email ILIKE ('%@' || university_mails.mail_extension)
                  JOIN event_participants ON event_participants.user_id = users.id
       WHERE event_participants.event_id = #{event_id}
       AND   event_participants.user_id <> #{current_user_id};"

    @demands = ActiveRecord::Base.connection.execute(get_event_join_demands_query)

    respond_to do |format|
      format.json { render json: @demands }
    end
  end

  def get_user_info
    ## TODO: Add profile pic, description message and favourite sports
    get_user_info_query =
      "SELECT users.first_name,
              users.last_name,
              users.description,
              users.telephone_number,
              university_mails.university_name
       FROM users JOIN university_mails ON users.email ILIKE ('%@' || university_mails.mail_extension)
       WHERE users.id = #{current_user.id};"

    @user_info = ActiveRecord::Base.connection.execute(get_user_info_query)

    respond_to do |format|
      format.json { render json: @user_info }
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
