class Portfolio < ApplicationRecord
  validates :portfolio_name, presence: true
  validates :bio, presence: true
  validates :strategy, presence: true

  has_many :ledgers
  has_many :stocks, through: :ledgers
  belongs_to :bracket
end
