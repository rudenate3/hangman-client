'use strict'

angular
  .module('hangman', ['ui.router'])
  .config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/')

    $stateProvider
      .state('home', {
        url: '/',
        template: '<home></home>'
      })
      .state('login', {
        url: '/login',
        template: '<login></login>'
      })
      .state('register', {
        url: '/register',
        template: '<register></register>'
      })
      .state('changePassword', {
        url: '/change-password',
        template: '<change-password></change-password>'
      })
      .state('game', {
        url: '/game',
        template: '<game></game>'
      })
  })
  .config([
    '$locationProvider',
    $locationProvider => {
      $locationProvider.html5Mode(true)
    }
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor')
  })
  .factory('authInterceptor', function($rootScope, Auth) {
    return {
      // Add authorization token to headers
      request: function(config) {
        config.headers = config.headers || {}
        if (Auth.getAccessToken()) {
          config.headers.Authorization = Auth.getAccessToken()
        }
        return config
      }
    }
  })
