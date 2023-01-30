class OrderSerializer < ActiveModel::Serializer
  attributes :id, :quantity, :updated_at, :snack
  has_one :user
  has_one :snack

  # def summary
  #   "The title is #{self.object.title} and is directed by #{self.object.director}"
  # end

end
