class UsersController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :handle_blank_field
    def index
        render json: User.page(page).per(per_page), status: :ok
    end

    def create
        photo = Cloudinary::Uploader.upload(params[:avatar], :folder => '/tetish-inn/')
        user = User.create!(
            username: params[:username],
            email: params[:email],
            password: params[:password],
            password_confirmation: params[:password_confirmation],
            avatar: photo['url']
        )

        if user.valid?
            render json: user, status: :created
        else
            Cloudinary::uploader.destroy(photo['public_id'])
            render json: {error: 'Invalid'}, status: :unprocessable_entity        
        end
    end

    def show
       user = User.find_by(id: params[:id]) 
       if user 
           render json: user, status: :ok
        else
            render json: {error: "Couldn't find User with 'id'=#{params["id"]}"}, status: :unprocessable_entity
       end
    end

    def update
        user = User.find_by(id: params[:id])
        if user
            user.update!(user_params)
            if user.valid?
                render json: user, status: :accepted
            else
                render json: {error: 'Invalid'}, status: :unprocessable_entity
            end
        else
            render json: {error: "Couldn't find User with 'id'=#{params["id"]}"}, status: :unprocessable_entity
        end
    end

    def destroy
        user = User.find_by(id: params[:id])
        if user
            user.destroy
            render json: {success: "Deleted"}, status: :no_content
        else
            render json: {error: "User not found!"}, status: :unprocessable_entity
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

    def handle_blank_field(invalid)
        render json: {error: invalid.record.errors}, status: :unprocessable_entity
    end
end
