class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
      t.string :symbol, null: false
      t.integer :value, null: false
      t.belongs_to :portfolio, null: false

      t.timestamps null: false
    end
  end
end
