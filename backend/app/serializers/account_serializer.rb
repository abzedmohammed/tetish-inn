class AccountSerializer < ActiveModel::Serializer
  attributes :amount
  has_one :user
end
