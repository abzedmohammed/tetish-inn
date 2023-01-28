class SessionsController < ApplicationController
    def create
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
            # session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: {error: "Invalid username or password"}, status: :unauthorized
        end
    end

    def create_admin
        admin = Admin.find_by(username: params[:username])
        if admin&.authenticate(params[:password])
            # session[:admin_id] = admin.id
            render json: admin, status: :created
        else
            render json: {error: "Invalid username or password"}, status: :unauthorized
        end
    end

end
