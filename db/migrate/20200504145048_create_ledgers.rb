class CreateLedgers < ActiveRecord::Migration[5.2]
  def change
    create_table :ledgers do |t|
      t.belongs_to :portfolio, null: false
      t.belongs_to :stock, null: false

      t.timestamps null: false
    end
  end
end
