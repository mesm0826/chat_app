Rails.application.routes.draw do
  get '/users/search', to:'users#search'
  devise_for :users
  resources :users, :only => [:show]
  namespace :api, { format: 'json' } do
    resources :messages
    resources :users
    resources :current_user
    resources :search_users
  end

  resources :messages
  root to: 'messages#index'
end
