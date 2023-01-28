class OrdersController < ApplicationController
    def index
        render json: Order.page(page).per(per_page), status: :ok
    end

    def create
        order = Order.create!(order_params)
        if order.valid?
            render json: order, status: :created
        else
            render json: order.errors, status: :unprocessable_entity        
        end
    end

    def show
       order = Order.find(params[:id]) 
       if order 
           render json: order, status: :ok
        else
            render json: order.errors, status: :unprocessable_entity
       end
    end

    def update
        order = Order.find(params[:id])
        if order
            order.update!(order_params)
            render json: order, status: :accepted
        else
            render json: order.errors, status: :unprocessable_entity
        end
    end

    def destroy
        order = Order.find(params[:id])
        if order
            order.destroy
            render json: {success: "Deleted"}, status: :no_content
        else
            render json: order.errors, status: :unprocessable_entity
        end
    end


    private

    def order_params
        params.permit(:user_id, :snack_id, :quantity)
    end

    def per_page
        @per_page ||= params[:per_page] || 10
    end

    def page
        @page ||= params[:page] || 1
    end
end
