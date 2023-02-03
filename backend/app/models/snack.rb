class Snack < ApplicationRecord
  validates :snack_type, inclusion: { in: %w(sweet salty hot),
    message: "%{value} is not a valid snack type" }

  belongs_to :admin
end
