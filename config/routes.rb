Rails.application.routes.draw do
  get '/users/search', to:'users#search'
  # post '/friendships/:id/delete', to: 'friendships#delete'
  devise_for :users, :controllers => {
   :sessions => 'users/sessions'
  }
  resources :users, :only => [:show]
  namespace :api, { format: 'json' } do
    post '/messages/save_image', to:'messages#save_image'
    resources :messages
    resources :users, :only => [:index, :create]
    resources :current_user, :only => [:index]
    resources :search_users, :only => [:index]
  end

  resources :messages
  resources :friendships, :only => [:destroy]
  root to: 'messages#index'
end
