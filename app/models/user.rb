class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :lockable, :timeoutable

  # FIXME: regex problem
  # possible_reg = Regexp.union(UniversityMail.pluck(:mail_extension))
  # validates :email, :format => /\A([\w+\-]\.?)+@#{possible_reg}\z/i

  has_many :event_participants
  has_many :events
end
