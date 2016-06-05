require 'rails_helper'

RSpec.describe Sport, type: :model do

  describe '#sport database table' do
    it 'should have same # of entries as # of files in images/sports' do
      number_entries = Sport.distinct.count('name')
      number_sport_logos = Dir['app/assets/images/sports/*.png'].length
      expect(number_entries).to eq(number_sport_logos)
    end
  end

end
