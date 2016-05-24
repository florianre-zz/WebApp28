class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :sport
      t.string :date
      t.string :time
      t.string :location
      t.integer :needed
      t.text :additional_info

      t.timestamps null: false
    end
  end
end
