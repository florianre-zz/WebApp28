class FavouriteSport < ActiveRecord::Base
	self.primary_keys = :user_id, :sport
	belongs_to :user
	belongs_to :sports
end
