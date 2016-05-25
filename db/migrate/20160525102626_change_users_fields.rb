class ChangeUsersFields < ActiveRecord::Migration
  def change
  	## First and Last Name cannot be null
  	change_column_null :users, :first_name, false
  	change_column_null :users, :last_name, false

  	## Removing university field
  	remove_column :users, :university
  end
end
