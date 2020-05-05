class Portfolio < ApplicationRecord
  validates :portfolio_name, presence: true
  validates :bio, presence: true
  validates :strategy, presence: true
  validates :total_value, presence: true

  has_many :stocks, through :ledgers
  belongs_to :bracket
end
