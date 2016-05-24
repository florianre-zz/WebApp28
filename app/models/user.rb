class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :confirmable

  validates :email, :format => /\A([\w+\-]\.?)+@ic.ac.uk\z/i

  def create_table
    university_table = Hash.new
    Dir.glob('../../universities/*.txt') do |f|
      file = File.open(f, "r")
      data = file.read
      university_table["@#{File.basename(f, ".txt")}.ac.uk"] = data
      file.close
    end
    return university_table
  end

end
