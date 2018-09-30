'use strict'

angular.module('hangman').component('game', {
  templateUrl: '/src/components/pages/templates/game.tmpl.html',
  controller: function(Game) {
    const createGameState = game => {
      this.gameState = {}
      if (game.data.game.guesses) {
        game.data.game.incorrectGuesses = game.data.game.guesses.filter(
          guess => {
            return this.correctLetters.indexOf(guess) < 0
          }
        )
        game.data.game.correctGuesses = game.data.game.guesses.filter(guess => {
          return this.correctLetters.indexOf(guess) > -1
        })
      }
      this.correctFields = game.data.game.word
        .split('')
        .reduce((prev, curr) => {
          if (!game.data.game.correctGuesses) {
            prev.push('-')
          } else if (game.data.game.correctGuesses.includes(curr)) {
            prev.push(curr)
          } else {
            prev.push('-')
          }
          return prev
        }, [])
      this.gameState = game.data.game
      this.guessInput = ''
    }
    this.$onInit = () => {
      Game.playGame().then(game => {
        this.fields = game.data.game.word.split('')
        this.correctLetters = Object.keys(
          game.data.game.word.split('').reduce((prev, curr) => {
            prev[curr] = true
            return prev
          }, {})
        )
        createGameState(game)
      })
    }

    this.newGame = () => {
      Game.playGame().then(game => {
        this.fields = game.data.game.word.split('')
        this.correctLetters = Object.keys(
          game.data.game.word.split('').reduce((prev, curr) => {
            prev[curr] = true
            return prev
          }, {})
        )
        createGameState(game)
      })
    }

    this.submitInput = guessInput => {
      Game.attemptMove(this.gameState.id, guessInput).then(game =>
        createGameState(game)
      )
    }
  }
})
