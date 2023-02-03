class HomeController < ApplicationController
    def index
        render json: {
            Welcome: "Hello Welcome to TETISH INN API. Created with Ruby on Rails",
            resources: {
                users: "/users",
                products: "/snacks",
                orders: "/orders",
                accounts: "/accounts",
                admins: "/admins"
            }
        }
    end
end
