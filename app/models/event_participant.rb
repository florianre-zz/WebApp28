class EventParticipant < ActiveRecord::Base
	self.primary_keys = :event_id, :user_id
	belongs_to :event
	belongs_to :user

	validates :participants, :numericality => { :greater_than_or_equal_to => 1 }
end
