class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
      t.string :name, null: false
      t.string :symbol, null: false
      t.integer :value, null: false

      t.timestamps null: false
    end
  end
end
