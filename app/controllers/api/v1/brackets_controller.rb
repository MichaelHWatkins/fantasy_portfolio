class Api::V1::BracketsController < ApplicationController
before_action :authenticate_user!
protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Bracket.all
  end

  def show
    bracket = Bracket.find(params[:id])
    portfolios = bracket.portfolios
   render json: {bracket: bracket,
      portfolios: portfolios}
  end

  def create
    bracket = Bracket.new(bracket_params)
    if bracket.save
      render json: bracket
    else
      render json: { error: bracket.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def bracket_params
    params.require(:bracket).permit(:bracket_bio, :bracket_name)
  end
end
