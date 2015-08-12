require 'rails_helper'

describe 'routes for Api::V1::Products' do
  let(:product_id) { Faker::Number.number(1) }

  # index
  it { expect(get('/api/v1/products')).to route_to('api/v1/products#index', format: :json) }

  # update
  it { expect(put("/api/v1/products/#{product_id}")).to route_to('api/v1/products#update', id: product_id, format: :json) }
end
