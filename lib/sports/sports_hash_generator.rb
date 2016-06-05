module SportsHashGenerator
  include ActionView::Helpers::AssetUrlHelper, ActionView::Helpers::AssetTagHelper

  def self.generate_sports_hash
    sports_table = Hash.new
    sports_list_path = 'app/assets/images/sports/*.png'

    Dir.glob(sports_list_path) do |sport_logo|
      sport = File.basename(sport_logo, ".png").titleize
      sports_table[sport.titleize] =
        ActionController::Base.helpers.path_to_image("#{sport.downcase}.png")
    end

    sports_table
  end

end
