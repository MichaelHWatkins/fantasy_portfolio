require 'faraday'

class Api::V1::StocksController < ApplicationController
protect_from_forgery unless: -> { request.format.json? }
before_action :authenticate_user!

  def index
    stocks = Stock.where(portfolio_id: params[:portfolio_id])
    render json: stocks
  end

  def show
    render json: Stock.find(params[:id])
  end

  def create
    api_key = ENV['API_KEY']
    ticker_name = params[:_json]
    url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=#{ticker_name}&apikey=#{api_key}"
    api_response = Faraday.get(url)
    parsed_response = JSON.parse(api_response.body)
    day_key = parsed_response["Time Series (Daily)"].keys.first
    value = parsed_response["Time Series (Daily)"][day_key]["4. close"].to_f
    points = value - value
    stock = Stock.new()
    stock.points = points
    stock.value = value
    stock.symbol = ticker_name
    portfolio = Portfolio.find(params[:portfolio_id])
    stock.portfolio = portfolio
    if stock.save
      render json: stock
    else
      render json: { error: portfolio.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    stock = Stock.find(params[:id])
    api_key = ENV['API_KEY']
    ticker_name = stock.symbol
    url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=#{ticker_name}&apikey=#{api_key}"
    api_response = Faraday.get(url)
    parsed_response = JSON.parse(api_response.body)
    day_key = parsed_response["Time Series (Daily)"].keys.first
    new_value = parsed_response["Time Series (Daily)"][day_key]["4. close"].to_f
    stock.points = new_value - stock.value
    stock.save
    render json: stock
  end
end
