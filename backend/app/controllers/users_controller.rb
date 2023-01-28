class UsersController < ApplicationController
    def index
        render json: User.page(page).per(per_page), status: :ok
    end

    def create
        user = User.create!(user_params)
        if user.valid?
            render json: user, status: :created
        else
            render json: user.errors, status: :unprocessable_entity        
        end
    end

    def show
       user = User.find(params[:id]) 
       if user 
           render json: user, status: :ok
        else
            render json: user.errors, status: :unprocessable_entity
       end
    end

    def update
        user = User.find(params[:id])
        if user
            user.update!(user_params)
            render json: user, status: :accepted
        else
            render json: user.errors, status: :unprocessable_entity
        end
    end

    def destroy
        user = User.find(params[:id])
        if user
            user.destroy
            render json: {success: "Deleted"}, status: :no_content
        else
            render json: user.errors, status: :unprocessable_entity
        end
    end


    private

    def user_params
        params.permit(:username, :password, :email, :password_confirmation, :avatar)
    end

    def per_page
        @per_page ||= params[:per_page] || 10
    end

    def page
        @page ||= params[:page] || 1
    end
end
