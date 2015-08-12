class Api::V1::ProductsController < Api::V1::ApplicationController
  before_action :set_product, only: [:update]

  def index
    @products = Product.all
    render_success(@products)
  end

  def update
    if @product.update(update_params)
      render_success(@product, :accepted)
    else
      render_errors(@product.errors, :unprocessable_entity)
    end
  end

  private

  def update_params
    params.require(:product).permit(:name, :sku, :category)
  end

  def set_product
    @product = Product.find(params[:id])
  end
end
