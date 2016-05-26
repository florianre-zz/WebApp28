class EventsController < ApplicationController
  def index
    @events = Event.all()

    respond_to do |format|
      format.html {}
      format.json { render json: @events }
    end
  end

  def show
  end

  def create
    current_user_id = current_user.id

    # BUG - params appear but can't retrieve them :(

    # puts current_user_id
    # puts
    # puts "PARAMETERS"
    # puts params[:params]
    # puts "CONTROLLER"
    # puts params[:controller]
    # puts "FORMAT"
    # puts params[:format]
    # puts "SPORT"
    # puts params[:params][:sport]

    # puts
    # puts

    # Create new entry and store it in the events table of the database
    # Parameters of new event are given from the HTTP POST request
    new_event =
      Event.create(:sport => params[:sport],
                   :date => params[:date],
                   :start_time => params[:start_time],
                   :end_time => params[:end_time],
                   :location => params[:location],
                   :additional_info => params[:additional_info],
                   :needed => params[:needed],
                   :min_participants => params[:min_participants],
                   :participants => 1,
                   :user_id => current_user.id)

    # Create new event participant and store it in the event_participants
    # table of the database
    # Parameters are given from current user id and created event id
    EventParticipant.create(:event_id => new_event.id,
                            :user_id => current_user_id)
    render :nothing => true
  end
end
