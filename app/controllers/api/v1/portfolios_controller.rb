class Api::V1::PortfoliosController < ApplicationController
protect_from_forgery unless: -> { request.format.json? }

  def show
    render json: Portfolio.find(params[:id])
  end

  def create
    portfolio = Portfolio.new(portfolio_params)
    bracket = Bracket.find(params[:bracket_id])
    portfolio.bracket = bracket
    if portfolio.save
      render json: portfolio
    else
      render json: { error: portfolio.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @portfolio = Portfolio.find(params[:id])
    @portfolio.destroy
    render json: {}, status: :no_content
  end

  private
  def portfolio_params
    params.require(:portfolio).permit(:strategy, :portfolio_name, :bio)
  end
end
