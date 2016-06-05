module SportsHashGenerator
  include ActionView::Helpers::AssetUrlHelper, ActionView::Helpers::AssetTagHelper

  def self.generate_sports_hash
    sports_table = Hash.new
    sports_list_path = 'app/assets/images/sports/*.png'

    Dir.glob(sports_list_path) do |sport_logo|
      sport = File.basename(sport_logo, ".png").titleize
      sports_table[sport] =
        ActionController::Base.helpers.path_to_image("#{sport_logo}")
    end


    # IO.foreach(sports_list_path) do |line|
    #   ## Removing space after sport name
    #   sport = line.chomp
    #   if !sports_table.has_key?(sport)
    #     sports_table[sport] = ActionController::Base.helpers.path_to_image("#{sport.downcase}.png")
    #   end
    # end

    sports_table
  end

end
