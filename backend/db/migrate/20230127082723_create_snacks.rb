class CreateSnacks < ActiveRecord::Migration[7.0]
  def change
    create_table :snacks do |t|
      t.string :name
      t.integer :price
      t.integer :quantity
      t.string :flavors # array: true, default: []
      t.integer :subtotal
      t.string :snack_type
      t.string :image
      t.belongs_to :admin, null: false, foreign_key: true

      t.timestamps
    end
  end
end
