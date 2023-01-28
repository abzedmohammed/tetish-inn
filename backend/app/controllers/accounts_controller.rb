class AccountsController < ApplicationController
    def index
        render json: Account.page(page).per(per_page), status: :ok
    end

    def create
        account = Account.create!(account_params)
        if account.valid?
            render json: account, status: :created
        else
            render json: account.errors, status: :unprocessable_entity        
        end
    end

    def show
       account = Account.find(params[:id]) 
       if account 
           render json: account, status: :ok
        else
            render json: account.errors, status: :unprocessable_entity
       end
    end

    def update
        account = Account.find(params[:id])
        if account
            account.update!(account_params)
            render json: account, status: :accepted
        else
            render json: account.errors, status: :unprocessable_entity
        end
    end

    def destroy
        account = Account.find(params[:id])
        if account
            account.destroy
            render json: {success: "Deleted"}, status: :no_content
        else
            render json: account.errors, status: :unprocessable_entity
        end
    end


    private

    def account_params
        params.permit(:user_id, :amount)
    end

    def per_page
        @per_page ||= params[:per_page] || 10
    end

    def page
        @page ||= params[:page] || 1
    end
end
