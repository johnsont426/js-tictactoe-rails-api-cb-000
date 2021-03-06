class GamesController < ApplicationController

  def index
    @games = Game.all
  end

  def create
    @game = Game.create(game_params)
    render json: @game
  end

  def show
    @game = Game.find(params[:id])
    render json: @game
  end

  def update
    @game = Game.update(game_params)
    render json: @game
  end

  private

  	def game_params
  		params.require(:game).permit(:state => [])
  	end

end