'use strict'

angular.module('hangman').component('game', {
  templateUrl: '/src/components/pages/templates/game.tmpl.html',
  controller: function($rootScope, $http, Game) {
    this.$onInit = () => {
      Game.playGame()
    }
    this.getGames = () => {}
  }
})
