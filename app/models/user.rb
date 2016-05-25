class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :confirmable, :lockable, :timeoutable

  validates :email, :format => /\A([\w+\-]\.?)+@ic.ac.uk\z/i

  def create_table
    university_table = Hash.new
    universities_mail_ext = '../assets/universities/*.txt'
    Dir.glob(universities_mail_ext) do |f|
      file = File.open(f, "r")
      data = file.read
      university_ext = "#{File.basename(f, ".txt")}.ac.uk"
      university_table[university_ext] = data
      file.close
    end
    university_table
  end

end
