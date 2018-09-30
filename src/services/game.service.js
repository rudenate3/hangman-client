'use strict'

angular.module('hangman').factory('Game', function ($http, config) {
  return {
    playGame: function () {
      return $http({
        method: 'GET',
        url: `${config.apiUrl}/game`
      })
    },
    attemptMove: function (id, move) {
      return $http({
        method: 'PUT',
        url: `${config.apiUrl}/move/${id}`,
        contentType: 'application/json; charset=utf-8',
        data: move
      })
    },

    getHistory: function () {
      return $http({
        method: 'GET',
        url: `${config.apiUrl}/history`
      })
    }
  }
})