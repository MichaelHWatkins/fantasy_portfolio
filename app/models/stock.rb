class Stock < ApplicationRecord
  validates :value, presence: true
  validates :symbol, presence: true
  belongs_to :portfolio
end
