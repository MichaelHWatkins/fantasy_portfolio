class CreateBrackets < ActiveRecord::Migration[5.2]
  def change
    create_table :brackets do |t|
      t.string :bracket_name, null: false
      t.string :bracket_bio, null: false

      t.timestamps null: false
    end
  end
end
