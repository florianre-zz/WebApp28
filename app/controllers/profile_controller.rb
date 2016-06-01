class ProfileController < ApplicationController

  helper_method :resource_name, :resource, :devise_mapping

  def index
    @profile_link = "#"
    @new_event_link = "#"
    @dropdown_partial = "shared/logged_in_dropdown"
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
