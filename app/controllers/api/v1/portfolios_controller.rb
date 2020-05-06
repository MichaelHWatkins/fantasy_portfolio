class Api::V1::PortfoliosController < ApplicationController
protect_from_forgery unless: -> { request.format.json? }

  def create
    binding.pry
    portfolio = Portfolio.new(portfolio_params)
    bracket = Bracket.find(params[:bracket_id])
    portfolio.bracket = bracket
    if portfolio.save
      render json: portfolio
    else
      render json: { error: portfolio.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def portfolio_params
    params.require(:portfolio).permit(:strategy, :portfolio_name, :bio)
  end
end
