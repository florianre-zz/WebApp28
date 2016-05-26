require 'university_mail/mail_university_hash_generator'
require 'university_mail/university_country'

class CreateUniversityMails < ActiveRecord::Migration
  include MailUniversityHashGenerator, UniversityCountry

  def up
    ## Create the table storing a mail extension and which gives us a
    ## university name (eg: ic.ac.uk)
    create_table :university_mails, id: false do |t|
      t.string :mail_extension, primary_key: true, null: false
      t.string :university_name, null: false
    end

    ## add an index to speed up queries
    add_index :university_mails, :mail_extension, unique: true

    ## Get the hash of all universities and their mail extension
    university_table = generate_mail_university_hash(UniversityCountry::ENGLAND)

    ## Populate the table with all the predefined english universities
    university_table.each do |mail_ext, uni_name|
      UniversityMail.create(mail_extension: mail_ext, university_name: uni_name)
    end

  end

  def down
    drop_table :university_mails
  end

end
