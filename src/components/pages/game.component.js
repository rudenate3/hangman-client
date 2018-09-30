'use strict'

angular.module('hangman').component('game', {
  templateUrl: '/src/components/pages/templates/game.tmpl.html',
  controller: function(Game) {
    this.$onInit = () => {
      Game.playGame().then(game => (this.gameState = game.data.game))
    }

    this.submitInput = () => {
      Game.attemptMove(this.gameState.id, 'z')
    }
  }
})
