FactoryGirl.define do
  factory :product do
    name { Faker::Commerce.product_name }
    sku { Faker::Code.isbn }
    category { Faker::Commerce.department }
  end
end
