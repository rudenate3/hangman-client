'use strict'

angular.module('hangman').component('history', {
  templateUrl: '/src/components/pages/templates/history.tmpl.html',
  controller: function(Game) {
    this.$onInit = () => {
      Game.getHistory().then(games => {
        const updatedGames = games.data.games.map(game => {
          const correctGuesses = [],
            incorrectGuesses = [],
            correctLetters = Object.keys(
              game.word.split('').reduce((prev, curr) => {
                prev[curr] = true
                return prev
              }, {})
            )
          game.guesses.forEach(guess => {
            if (correctLetters.indexOf(guess) < 0) {
              incorrectGuesses.push(guess)
            } else {
              correctGuesses.push(guess)
            }
          })
          game.correctGuesses = correctGuesses
          game.incorrectGuesses = incorrectGuesses
          return game
        })
        this.games = updatedGames
      })
    }
  }
})
