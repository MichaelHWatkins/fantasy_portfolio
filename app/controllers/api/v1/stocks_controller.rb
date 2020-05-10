require 'faraday'

class Api::V1::StocksController < ApplicationController
protect_from_forgery unless: -> { request.format.json? }

  def index
    stocks = Stock.where(portfolio_id: params[:portfolio_id])
    render json: stocks
  end

  def create
    api_key = ENV['API_KEY']
    ticker_name = params[:_json]
    url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=#{ticker_name}&apikey=#{api_key}"
    api_response = Faraday.get(url)
    parsed_response = JSON.parse(api_response.body)
    day_key = parsed_response["Time Series (Daily)"].keys.first
    value = parsed_response["Time Series (Daily)"][day_key]["4. close"].to_f
    price = value - value
    stock = Stock.new()
    stock.value = price
    stock.symbol = ticker_name
    portfolio = Portfolio.find(params[:portfolio_id])
    stock.portfolio = portfolio
    if stock.save
      render json: stock
    else
      render json: { error: portfolio.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
