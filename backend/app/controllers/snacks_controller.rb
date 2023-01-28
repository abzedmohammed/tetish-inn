class SnacksController < ApplicationController
    def index
        render json: Snack.page(page).per(per_page), status: :ok
    end

    def create
        snack = Snack.create!(snack_params)
        if snack.valid?
            render json: snack, status: :created
        else
            render json: snack.errors, status: :unprocessable_entity        
        end
    end

    def show
       snack = Snack.find(params[:id]) 
       if snack 
           render json: snack, status: :ok
        else
            render json: snack.errors, status: :unprocessable_entity
       end
    end

    def update
        snack = Snack.find(params[:id])
        if snack
            snack.update!(snack_params)
            render json: snack, status: :accepted
        else
            render json: snack.errors, status: :unprocessable_entity
        end
    end

    def destroy
        snack = Snack.find(params[:id])
        if snack
            snack.destroy
            render json: {success: "Deleted"}, status: :no_content
        else
            render json: snack.errors, status: :unprocessable_entity
        end
    end


    private

    def snack_params
        params.permit(:name, :price, :quantity, :flavors, :subtotal, :snack_type, :image, :admin_id)
    end

    def per_page
        @per_page ||= params[:per_page] || 10
    end

    def page
        @page ||= params[:page] || 1
    end
end
