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

  # http request redirected to create function in events_controller
  resources :events, only: [:index, :create]

  # http request redirected to index function in university_mails_controller
  resources :university_mails, only: [:index]

  # http request redirected to create function in event_participants_controller
  resources :event_participants, only: [:create]

  # http requested redirected to create function in profile_controller
  resources :profile, only: [:index]
  get 'profile/created_events', to: 'profile#get_created_events'
  get 'profile/joined_events', to: 'profile#get_joined_events'
  get 'profile/event_join_demands', to: 'profile#get_event_join_demands'

  # http requested redirected to index function in sports_controller
  resources :sports, only: [:index]

end
