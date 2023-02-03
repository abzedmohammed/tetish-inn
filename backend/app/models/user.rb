class User < ApplicationRecord
    validates :username, :email, :password, presence: true
    validates :username, :email, uniqueness: { case_sensitive: false }
    validates :username, length: { minimum: 5 }
    validates :password, confirmation: true, length: { in: 6..20 }

    has_secure_password
    has_one :account, dependent: :destroy
    has_many :orders, dependent: :destroy
end
