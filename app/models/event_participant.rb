class EventParticipant < ActiveRecord::Base
	self.primary_keys = :event_id, :user_id
	belongs_to :event
	belongs_to :user
end
