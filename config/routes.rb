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

  # Feed is main page
  root 'feed#index'

  # Profile page
  get 'profile', to: 'profile#index'

  # http request redirected to create function in events_controller
  resources :events, only: [:index, :create]

  # http request redirected to create function in university_mails_controller
  resources :university_mails, only: [:index]

  # http request redirected to create function in event_participants_controller
  resources :event_participants, only: [:create]
end
