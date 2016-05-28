require 'university_mail/university_mail_extension_generator'

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :lockable, :timeoutable

  # Wrapped in if statement to not cause error on db:migrate
  if UniversityMail.table_exists?
    possible_reg = UniversityMailExtensionGenerator.generate_university_mail_extensions()
    validates :email, :format => possible_reg
  end

  has_many :event_participants
  has_many :events
end
