require 'university_mail/mail_university_hash_generator'
require 'university_mail/university_country'

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# def generate_mail_university_hash
#   # universities_path = get_universities_path(university_country)
#   university_table = Hash.new
#
#   Dir.glob("lib/university_mail/universities_england/*") do |f|
#     File.foreach(f) do |line|
#       university_ext = "#{File.basename(f, ".txt")}.ac.uk"
#       university_table[university_ext] = line
#     end
#   end
#
#   university_table
# end

universities_hash = MailUniversityHashGenerator.generate_mail_university_hash(
                      UniversityCountry::ENGLAND)
universities_array = universities_hash.to_a
universities_array.each do |name, population|
  UniversityMail.create(mail_extension: name, university_name: population )
end
