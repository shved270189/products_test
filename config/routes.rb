Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      scope constraints: { format: :json }, defaults: { format: :json } do
        resources :products, only: [:index, :update]
      end

      match '*path', :to => 'application#invalid_route', via: [:options]
    end
  end
end
