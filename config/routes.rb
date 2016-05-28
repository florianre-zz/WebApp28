Rails.application.routes.draw do

  ## change the devise controller path to customise it
  devise_for :users, controllers:
    {
      confirmations: 'users/confirmations',
      registrations: 'users/registrations',
      sessions: 'users/sessions',
      passwords: 'users/passwords',
      unlocks: 'users/unlocks'
    }

  # You can have the root of your site routed with "root"
  root 'feed#index'

  # http request redirected to create function in events_controller
  resources :events, only: [:index, :create]

  # http request redirected to create function in university_mail_controller
  resources :university_mails, only: [:index]
end
