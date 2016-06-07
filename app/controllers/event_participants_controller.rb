class EventParticipantsController < ApplicationController

  def create
    ## Create new event_participant entry, set confirmed to false
    EventParticipant.create(:event_id => params[:event_id],
                            :user_id => current_user.id,
                            :participants => 1,
                            :confirmed => false,
                            :message => "")

    render :nothing => true
  end

	def update
    event_id = params[:event_id]
    user_id = params[:user_id]

    event_participation = EventParticipant.find_by(event_id: event_id, user_id: user_id)
    event_participation.update(confirmed: true)

    render :nothing => true
  end

  def destroy
    event_id = params[:event_id]
    user_id = params[:user_id]
    
    event_participation = EventParticipant.find_by(event_id: event_id, user_id: user_id)
    event_participation.destroy

    render :nothing => true
  end

end