class User < ApplicationRecord
    validates :username, :email, presence: true
    validates :username, :email, uniqueness: { case_sensitive: false }
    validates :username, length: { minimum: 3, message: " should be atleast 3 characters long" }
    validates :password, confirmation: true, length: { in: 4..20, message: " should be atleast 4 characters long " }
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP, message: " invalid email address format"}

    has_secure_password
    has_one :account, dependent: :destroy
    has_many :orders, dependent: :destroy
end
