class Bracket < ApplicationRecord
  validates :bracket_name, presence: true
  validates :bracket_bio, presence: true
  has_many :portfolios
end
