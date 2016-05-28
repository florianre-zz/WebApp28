class Event < ActiveRecord::Base
	belongs_to :user
	has_many :event_participants, dependent: :destroy

	validates :needed, :min_participants, :participants, :numericality => { :greater_than_or_equal_to => 1 }

end
