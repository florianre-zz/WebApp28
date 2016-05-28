require 'rails_helper'

RSpec.describe(University::Email) do
  before { stub_const('University::Email::UNIVERSITIES', universities) }
  let(:universities) do
    [{ name: 'Imperial College London', domain: 'imperial.ac.uk' }]
  end

  describe '.valid?' do
    context 'with a valid university email' do
      it 'is true' do
        expect(University::Email.valid?('lmj112@imperial.ac.uk')).to be(true)
      end
    end

    context 'with non-university email' do
      it 'is false' do
        expect(University::Email.valid?('lmj112@gmail.com')).to be(false)
      end
    end
  end
end
