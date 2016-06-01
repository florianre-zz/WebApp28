require 'rails_helper'
require 'sports/sports_hash_generator'

RSpec.describe SportsHashGenerator do

  it "generator creates a hash mapping sports to images" do
    # generate the hash
    sports_hash = SportsHashGenerator.generate_sports_hash

    # check if some extension/university are present/absent
    sport = "Football"
    expect(sports_hash.key?(sport)).to eq(true)

    sport = "Basketball"
    expect(sports_hash.key?(sport)).to eq(true)

    york_ext = "Cooking"
    expect(sports_hash.key?(york_ext)).to eq(false)
  end

end
