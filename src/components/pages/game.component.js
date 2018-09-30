'use strict'

angular.module('hangman').component('game', {
  templateUrl: '/src/components/pages/templates/game.tmpl.html',
  controller: function (Game) {
    const createGameState = (game) => {
      this.gameState = {}
      this.gameState = game.data.game
      this.guessInput = ''
    }
    this.$onInit = () => {
      Game.playGame().then(game => createGameState(game))
    }

    this.newGame = () => {
      Game.playGame().then(game => createGameState(game))
    }

    this.submitInput = (guessInput) => {
      console.log(this.gameState)
      console.log(this.gameState.id)
      Game.attemptMove(this.gameState.id, guessInput).then(game => createGameState(game))
    }
  }
})