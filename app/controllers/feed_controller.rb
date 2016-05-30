class FeedController < ApplicationController
  # No authentification needed to go on feed
  skip_before_action :authenticate_user!, :only => [:index]

  helper_method :resource_name, :resource, :devise_mapping

  def index
    # Get the links depending if the user is logged in or not
    sign_in_link = "users/sign_in"

    if user_signed_in?
      @profile_link = "#"
      @new_event_link = "#"
      @dropdown_partial = "shared/logged_in_dropdown"
    else
      @profile_link = sign_in_link
      @new_event_link = sign_in_link
      @dropdown_partial = "shared/login_dropdown"
    end

  end

  # Helper methods
  def resource_name
    :user
  end

  def resource
    @resource ||= User.new
  end

  def devise_mapping
    @devise_mapping ||= Devise.mappings[:user]
  end
end
