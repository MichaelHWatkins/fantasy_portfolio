require 'rails_helper'

RSpec.describe Api::V1::BracketsController, type: :controller do
  describe "GET#index" do
    let!(:user) { FactoryBot.create(:user) }
    let!(:bracket){Bracket.create(bracket_name: "Work", bracket_bio: "for testing at work")}

    it "returns a successful response status and a content type of json" do
      get :index

      expect(response.status).to eq 200
      expect(response.content_type).to eq "application/json"
    end
  end
end
