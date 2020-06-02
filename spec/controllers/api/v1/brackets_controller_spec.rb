require 'rails_helper'

RSpec.describe Api::V1::BracketsController, type: :controller do
  let!(:user) { FactoryBot.create(:user) }
  let!(:bracket){Bracket.create(bracket_name: "Work", bracket_bio: "for testing at work")}
  let!(:portfolio){Portfolio.create(portfolio_name: "Mike's portfolio", bio: "tester", strategy: "testing", bracket: bracket)}

  describe "GET#index" do

    it "returns a successful response status and a content type of json" do
      sign_in user
      get :index

      expect(response.status).to eq 200
      expect(response.content_type).to eq "application/json"
    end

    it "should return a list of all the brackets" do
      sign_in user
      get :index
      parsed_response = JSON.parse(response.body)

      expect(parsed_response.length).to eq 1
      expect(parsed_response[0]["bracket_name"]).to eq bracket.bracket_name
      expect(parsed_response[0]["bracket_bio"]).to eq bracket.bracket_bio
    end
  end

  describe 'GET#show' do

    it "returns json for the portfolio assigned to the bracket" do
      sign_in user
      get :show, params: {id: bracket.id}
      parsed_response = JSON.parse(response.body)

      expect(parsed_response).to be_kind_of(Hash)
      expect(parsed_response).to have_key 'portfolios'
      expect(parsed_response['portfolios'][0]).to be_kind_of(Hash)
      expect(parsed_response['portfolios'].length).to eq 1
      expect(parsed_response['bracket']["id"]).to eq bracket.id
      expect(parsed_response['bracket']["bracket_name"]).to eq bracket.bracket_name
      expect(parsed_response['bracket']['bracket_bio']).to eq bracket.bracket_bio

    end
  end

  describe 'POST#create' do
    let!(:good_bracket_data){{bracket:{bracket_name: "created bracket", bracket_bio: "created bio"}}}
    it "creates a new bracket" do
      sign_in user
      prev_count = Bracket.count
      post :create, params: good_bracket_data, format: :json
      new_count = Bracket.count
      returned_json = JSON.parse(response.body)

      expect(new_count).to eq(prev_count + 1)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
    end
  end

  describe 'DELETE#destroy' do
    let!(:bracket1){Bracket.create(bracket_name: "Work", bracket_bio: "for testing at work")}
    it 'deletes a bracket' do
      sign_in user
      previous_count = Bracket.count
      delete :destroy, params: {id: bracket1.id}
      new_count = Bracket.count
      expect(new_count).to eq (previous_count - 1)
    end
  end
end
