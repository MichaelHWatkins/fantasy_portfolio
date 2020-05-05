class Stock < ApplicationRecord
  validates :name, presence: true
  validates :value, presence: true
  validates :symbol, presence: true

  has_many :portfolios, through: :ledgers
end
