'use strict'

angular.module('hangman').component('game', {
  templateUrl: '/src/components/pages/templates/game.tmpl.html',
  controller: function(Game, config) {
    const createGameState = game => {
      this.gameState = {}
      if (game.data.game.guesses) {
        game.data.game.incorrectGuesses = game.data.game.guesses.filter(
          guess => {
            return game.data.game.correctGuesses.indexOf(guess) < 0
          }
        )
      }

      this.gameState = game.data.game
      this.guessInput = ''
      this.imageUrl = `${config.imagePath}/${
        game.data.game.incorrectGuesses
          ? game.data.game.incorrectGuesses.length
          : 0
      }.png`
    }

    this.$onInit = () => {
      this.newGame()
    }

    this.newGame = () => {
      Game.playGame().then(game => createGameState(game))
    }

    this.submitInput = guessInput => {
      Game.attemptMove(this.gameState.id, guessInput).then(game => {
        if (game.data.game) createGameState(game)
      })
    }
  }
})
