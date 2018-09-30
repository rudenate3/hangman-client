'use strict'

angular.module('hangman').factory('Game', function($http, config) {
  return {
    playGame: function() {
      $http({
        method: 'GET',
        url: `${config.apiUrl}/game`
      }).then(
        response => {
          console.log(response)
        },
        err => {
          console.error(err)
        }
      )
    },
    attemptMove: function() {
      $http({
        method: 'PUT',
        url: `${config.apiUrl}/move`
      }).then(
        response => {
          console.log(response)
        },
        err => {
          console.error(err)
        }
      )
    },
    getHistory: function() {
      $http({
        method: 'GET',
        url: `${config.apiUrl}/history`
      }).then(
        response => {
          console.log(response)
        },
        err => {
          console.error(err)
        }
      )
    }
  }
})
