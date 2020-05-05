Rails.application.routes.draw do
  root 'brackets#index'
  devise_for :users
  namespace :api do
    namespace :v1 do
      resources :brackets, only: [:index, :create, :show] do
        resources :portfolios
      end
    end
  end

  resources :brackets, only: [:index, :show] do
    resources :portfolios
  end



end
