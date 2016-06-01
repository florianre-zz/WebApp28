require 'rails_helper'

RSpec.describe Event, type: :model do

  describe '#date' do
    event = Event.new(sport: 'Football',
                      start_time: '20:00:00', end_time: '21:00:00',
                      university_location: 'Imperial College London')

    it 'should fail past date validation' do
      event.date = Date.yesterday
      event.valid? # run validations
      expect(event).to have(1).errors_on(:date)
      expect(event.errors_on(:date)).to include('Date cannot be in the past!')
    end

    it 'should pass past date validation' do
      event.date = Date.tomorrow
      event.valid? # run validations
      expect(event).to have(0).errors_on(:date)
    end
  end

  describe '#start_time' do
    event = Event.new(sport: 'Football',
                      date: Date.tomorrow,
                      end_time: '20:00:00',
                      university_location: 'Imperial College London')

    it 'should pass time are logical validation' do
      event.start_time = '21:00:00'
      event.valid? # run validations
      expect(event).to have(1).errors_on(:end_time)
      expect(event.errors_on(:end_time)).to include('End time should be later than the start time!')
    end

    it 'should pass time are logical validation' do
      event.start_time = '18:00:00'
      event.valid? # run validations
      expect(event).to have(0).errors_on(:end_time)
    end
  end

  describe '#end_time' do
    event = Event.new(sport: 'Football',
                      date: Date.tomorrow,
                      start_time: '20:00:00',
                      university_location: 'Imperial College London')

    it 'should fail time are logical validation' do
      event.end_time = '19:00:00'
      event.valid? # run validations
      expect(event).to have(1).errors_on(:end_time)
      expect(event.errors_on(:end_time)).to include('End time should be later than the start time!')
    end

    it 'should pass time are logical validation' do
      event.end_time = '21:00:00'
      event.valid? # run validations
      expect(event).to have(0).errors_on(:end_time)
    end
  end

  describe '#min_participants' do
    event = Event.new(sport: 'Football',
                      date: Date.tomorrow,
                      start_time: '20:00:00', end_time: '21:00:00',
                      university_location: 'Imperial College London')

    it 'should fail minimum number of participants validation' do
      event.min_participants = 1
      event.valid? # run validations
      expect(event).to have(1).errors_on(:min_participants)
      expect(event.errors_on(:min_participants)).to include('Minimum number of participants should be at least 2!')
    end

    it 'should pass university location validation' do
      event.min_participants = 10
      event.valid? # run validations
      expect(event).to have(0).errors_on(:min_participants)
    end
  end

  describe '#university_location' do
    event = Event.new(sport: 'Football',
                      date: Date.tomorrow,
                      start_time: '20:00:00', end_time: '21:00:00')

    it 'should fail university location validation' do
      event.university_location = 'Jupiter'
      event.valid? # run validations
      expect(event).to have(1).errors_on(:university_location)
      expect(event.errors_on(:university_location)).to include('University location is invalid.')
    end

    it 'should pass university location validation' do
      event.university_location = 'Imperial College London'
      event.valid? # run validations
      expect(event).to have(0).errors_on(:sport)
    end
  end

  describe '#sport' do
    event = Event.new(date: Date.tomorrow,
                      start_time: '20:00:00', end_time: '21:00:00',
                      university_location: 'Imperial College London')

    it 'should fail sport validation' do
      event.sport = 'Cooking'
      event.valid? # run validations
      expect(event).to have(1).errors_on(:sport)
      expect(event.errors_on(:sport)).to include('Sport choice is invalid.')
    end

    it 'should pass sport validation' do
      event.sport = 'Football'
      event.valid? # run validations
      expect(event).to have(0).errors_on(:sport)
    end
  end

end
