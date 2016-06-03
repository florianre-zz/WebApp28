module SportsHashGenerator

  def self.generate_sports_hash
    sports_table = Hash.new
    sports_list_path = 'lib/sports/sports_all.txt'

    IO.foreach(sports_list_path) do |line|
      ## Removing space after sport name
      sport = line.chomp
      if !sports_table.has_key?(sport)
        sports_table[sport] = 'This is a hard sport!'
      end
    end

    sports_table
  end

end
