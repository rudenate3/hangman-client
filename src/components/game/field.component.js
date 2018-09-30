'use strict'

angular.module('hangman').component('field', {
  templateUrl: '/src/components/game/templates/field.tmpl.html',
  bindings: {
    letter: '='
  }
})
