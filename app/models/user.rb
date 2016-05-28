class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :lockable, :timeoutable

  validate do |user|
    unless University::Email.valid?(user.email)
      user.errors[:email] << 'Must be valid university email'
    end
  end

  has_many :event_participants
  has_many :events
end
