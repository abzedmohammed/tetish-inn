class AdminSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :password_digest, :avatar, :is_admin
end
