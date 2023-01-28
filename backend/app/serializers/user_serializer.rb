class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :avatar, :created_at
  has_one :account
  has_many :orders
end
