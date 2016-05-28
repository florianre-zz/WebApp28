require 'university_mail/mail_university_hash_generator'
require 'university_mail/university_country'

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).

universities_hash = MailUniversityHashGenerator.generate_mail_university_hash(
                      UniversityCountry::ENGLAND)
universities_hash.each do |name, population|
  UniversityMail.create(mail_extension: name, university_name: population )
end
