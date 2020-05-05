class CreatePortfolios < ActiveRecord::Migration[5.2]
  def change
    create_table :portfolios do |t|
      t.string :portfolio_name, null: false
      t.integer :total_value, null: false
      t.string :bio, null: false
      t.string :strategy, null: false
      t.belongs_to :bracket, null: false

      t.timestamps null: false
    end
  end
end
