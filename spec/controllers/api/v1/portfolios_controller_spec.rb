RSpec.describe Api::V1::PortfoliosController, type: :controller do
  let!(:user) { FactoryBot.create(:user) }
  let!(:bracket){Bracket.create(bracket_name: "Work", bracket_bio: "for testing at work")}
  let!(:portfolio){Portfolio.create(portfolio_name: "Mike's portfolio", bio: "tester", strategy: "testing", bracket: bracket)}
  let!(:stock){Stock.create(value: 10, symbol: "AMZN", points: 0, portfolio: portfolio)}

  describe 'GET#show' do

    it "returns json for the stock assigned to the portfolio" do
      sign_in user
      get :show, params: {id: portfolio.id}
      parsed_response = JSON.parse(response.body)

      expect(parsed_response).to be_kind_of(Hash)
      expect(parsed_response).to have_key 'stocks'
    end
  end
end
