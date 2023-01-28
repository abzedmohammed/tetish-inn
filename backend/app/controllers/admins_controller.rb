class AdminsController < ApplicationController
    def index
        render json: Admin.page(page).per(per_page), status: :ok
    end

    def create
        admin = Admin.create!(admin_params)
        if admin.valid?
            render json: admin, status: :created
        else
            render json: admin.errors, status: :unprocessable_entity        
        end
    end

    def show
       admin = Admin.find(params[:id]) 
       if admin 
           render json: admin, status: :ok
        else
            render json: admin.errors, status: :unprocessable_entity
       end
    end

    def update
        admin = Admin.find(params[:id])
        if admin
            admin.update!(admin_params)
            render json: admin, status: :accepted
        else
            render json: admin.errors, status: :unprocessable_entity
        end
    end

    def destroy
        admin = Admin.find(params[:id])
        if admin
            admin.destroy
            render json: {success: "Deleted"}, status: :no_content
        else
            render json: admin.errors, status: :unprocessable_entity
        end
    end


    private

    def admin_params
        params.permit(:username, :password, :email, :password_confirmation, :avatar, :is_admin)
    end

    def per_page
        @per_page ||= params[:per_page] || 10
    end

    def page
        @page ||= params[:page] || 1
    end
end
