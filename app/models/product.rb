class Product < ActiveRecord::Base
  validates :name, :sku, :category, presence: true
end
