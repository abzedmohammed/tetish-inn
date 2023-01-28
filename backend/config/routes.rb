Rails.application.routes.draw do
  resources :accounts
  resources :orders
  resources :snacks
  resources :admins
  resources :users

  post "/login", to: "sessions#create"
  post "/login/admin", to: "sessions#create_admin"
  # get "/me/admin", to: "admins#show"
  # get "/me", to: "users#show"
end