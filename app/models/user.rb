class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :lockable, :timeoutable

  ## Check email is valid university mail
  validate do |user|
    unless University::Email.valid?(user.email)
      errors.add(:email, "Must be valid university email!")
    end
  end

  ## Foreign key from event_participants.user_id to users.id
  ## If user is destroyed, his participations are also destroyed
  has_many :event_participants, dependent: :destroy

  ## Foreign key from events.user_id to users.id
  ## If user is destroyed, his events are also destroyed
  has_many :events, dependent: :destroy
end
