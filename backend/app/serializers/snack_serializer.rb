class SnackSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :quantity, :flavors, :subtotal, :snack_type, :image
  # has_one :admin
end
