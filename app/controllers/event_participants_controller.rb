class EventParticipantsController < ApplicationController

  def create
    ## Create new event_participant entry, set confirmed to false
    current_user_id = current_user.id
    phone_num = params[:telephone_number]

    user = User.find_by(:id => current_user_id)
    if user[:telephone_number].nil? && !phone_num.blank?
      user.update(telephone_number: params[:telephone_number])
    end

    EventParticipant.create(:event_id => params[:event_id],
                            :user_id => current_user_id,
                            :participants => params[:participants],
                            :confirmed => false,
                            :message => params[:message])

    render :nothing => true
  end

	def update
    event_id = params[:id]
    user_id = params[:user_id]

    event_participation = EventParticipant.find_by(event_id: event_id, user_id: user_id)
    event_participation.update(confirmed: true)

    puts 

    render :nothing => true
  end

  def destroy
    event_id = params[:id]
    user_id = params[:user_id]

    event_participation = EventParticipant.find_by(event_id: event_id, user_id: user_id)
    event_participation.destroy

    render :nothing => true
  end

end
