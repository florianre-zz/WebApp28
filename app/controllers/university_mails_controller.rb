class UniversityMailsController < ApplicationController

  GET_ALL_UNIVERSITIES =
    "SELECT DISTINCT university_name
     FROM university_mails;"

  def index
    @universities =
      ActiveRecord::Base.connection.execute(GET_ALL_UNIVERSITIES)

    respond_to do |format|
      format.json { render json: @events }
    end
  end
end
