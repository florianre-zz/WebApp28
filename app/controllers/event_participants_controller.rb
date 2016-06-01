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

end