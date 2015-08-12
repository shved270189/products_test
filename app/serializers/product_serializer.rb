class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :sku, :category
end
