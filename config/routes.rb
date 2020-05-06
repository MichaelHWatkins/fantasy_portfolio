Rails.application.routes.draw do
  root "homes#index"
  devise_for :users

  get "/brackets/:id", to: "homes#index"

  namespace :api do
    namespace :v1 do
      resources :brackets, only: [:index, :create, :show] do
        resources :portfolios, only: [:create]
      end
    end
  end

end
