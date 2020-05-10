Rails.application.routes.draw do
  root "homes#index"
  devise_for :users

  get "/brackets/:id", to: "homes#index"
  get "/brackets/:bracket_id/portfolios/:id", to: "homes#index"
  get "/brackets/:bracket_id/portfolios/:portfolio_id/stocks", to: "homes#index"

  namespace :api do
    namespace :v1 do
      resources :brackets, only: [:index, :create, :show] do
        resources :portfolios, only: [:index, :create, :show, :destroy] do
          resources :stocks, only: [:index, :create]
        end
      end
    end
  end

end
