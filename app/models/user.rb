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

  ## Foreign key from favourite_sports.user_id to users.id
  ## If user is destroyed, his favourite sports entries are also destroyed
  has_many :favourite_sports, dependent: :destroy

  ## Check telephone number is valid
  validates_format_of :telephone_number, :allow_blank => true, :with => /\A([+ 0-9]+)\Z/i, :on => :update
  validate :tel_number_is_valid

  private

  def tel_number_is_valid
    if !telephone_number.nil?
      ## Check length bigger than 5, smaller than 15
      if (telephone_number.length < 5 || telephone_number.length > 15)
        errors.add(:telephone_number, "Telephone number too short or too long")
      end
    end
  end
end
