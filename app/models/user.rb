class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :lockable, :timeoutable

  # Wrapped in if statement to not cause error on db:migrate
  if UniversityMail.table_exists?
    possible_reg = Regexp.union(UniversityMail.pluck(:mail_extension))
    validates :email, :format => /\A([\w+\-]\.?)+@#{possible_reg}\z/i
  end

  has_many :event_participants
  has_many :events
end
