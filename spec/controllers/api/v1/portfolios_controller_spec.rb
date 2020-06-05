RSpec.describe Api::V1::PortfoliosController, type: :controller do
  let!(:user) { FactoryBot.create(:user) }
  let!(:bracket){Bracket.create(bracket_name: "Work", bracket_bio: "for testing at work")}
  let!(:portfolio){Portfolio.create(portfolio_name: "Mike's portfolio", bio: "tester", strategy: "testing", bracket: bracket)}

  describe 'GET#show' do

    it "returns json for the portfolio" do
      sign_in user
      get :show, params: {id: portfolio.id, bracket_id: bracket.id}
      parsed_response = JSON.parse(response.body)
      expect(parsed_response).to be_kind_of(Hash)
      expect(parsed_response.length).to eq 8
      expect(parsed_response["portfolio_name"]).to eq portfolio.portfolio_name
      expect(parsed_response["bio"]).to eq portfolio.bio
      expect(parsed_response["strategy"]).to eq portfolio.strategy
    end
  end

  describe 'POST#create' do

    it "creates a new portfolio" do
      good_portfolio_data = { bracket_id: bracket.id, portfolio: {strategy: "creation", portfolio_name: "created portfolio", bio: "created bio"}}
      sign_in user
      prev_count = Portfolio.count
      post :create, params: good_portfolio_data, format: :json
      new_count = Portfolio.count
      returned_json = JSON.parse(response.body)

      expect(new_count).to eq(prev_count + 1)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
    end
  end

  describe 'DELETE#destroy' do
    let!(:portfolio1){Portfolio.create(portfolio_name: "Mike's portfolio", bio: "tester", strategy: "testing", bracket: bracket)}
    it 'deletes a portfolio' do
      sign_in user
      previous_count = Portfolio.count
      delete :destroy, params: {id: portfolio1.id, bracket_id: bracket.id}
      new_count = Portfolio.count
      expect(new_count).to eq (previous_count - 1)
    end
  end
end
