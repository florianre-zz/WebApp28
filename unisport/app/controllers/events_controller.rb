class EventsController < ApplicationController
  def new
  end

  def create
    @event = Event.new(event_params)

    @event.save
    redirect_to @event
  end

  def show
    @event = Event.find(params[:id])
  end

  def index
    @events = Event.all
  end

  private 
  def event_params
    params.require(:event).permit(:sport, :date, :time, :location, :needed, :additional_info)
  end
end
