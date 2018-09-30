'use strict'

angular.module('hangman').component('guess', {
  templateUrl: '/src/components/game/templates/guess.tmpl.html',
  bindings: {
    letter: '='
  }
})