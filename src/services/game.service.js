'use strict'

angular.module('hangman').factory('Game', ($http, config) => {
  return {
    playGame: () => {
      return $http({
        method: 'GET',
        url: `${config.apiUrl}/game`
      })
    },
    attemptMove: (id, move) => {
      return $http({
        method: 'PUT',
        url: `${config.apiUrl}/move/${id}`,
        contentType: 'application/json; charset=utf-8',
        data: move
      })
    },

    getHistory: () => {
      return $http({
        method: 'GET',
        url: `${config.apiUrl}/history`
      })
    }
  }
})
