require 'rails_helper'

RSpec.describe Api::V1::ProductsController, :type => :controller do
  describe 'GET index' do
    let(:product_count) { 5 }
    let!(:products) { create_list(:product, product_count) }
    let(:index_request) { get :index }
    let(:index_response) { JSON.parse response.body }

    context 'response' do
      before { index_request }

      it 'should have status 200' do
        expect(response).to have_http_status(:ok)
      end

      it 'should have products' do
        expect(index_response['products'].count).to eq product_count
        index_response['products'].each do |product|
          expect(product['name']).to be_present
          expect(product['sku']).to be_present
          expect(product['category']).to be_present
        end
      end
    end
  end

  describe 'PUT update' do
    let(:product_attr) { attributes_for(:product) }
    let!(:product) { create(:product) }

    let!(:update_request) { put :update, id: product.id,
                                product: { name: product_attr[:name], sku: product_attr[:sku], category: product_attr[:category] } }

    let(:update_response) { JSON.parse response.body }

    context 'response' do
      before { update_request }
      it 'should have status 202' do
        expect(response.status).to eq(202)
      end

      it 'should have product' do
        expect(update_response['product']['name']).to eq product_attr[:name]
        expect(update_response['product']['sku']).to eq product_attr[:sku]
        expect(update_response['product']['category']).to eq product_attr[:category]
      end
    end

    context 'database' do
      it 'should have update product' do
        expect(Product.find(product.id)['name']).to eq product_attr[:name]
        expect(Product.find(product.id)['sku']).to eq product_attr[:sku]
        expect(Product.find(product.id)['category']).to eq product_attr[:category]
      end
    end
  end
end
