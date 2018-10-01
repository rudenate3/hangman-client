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
      .state('history', {
        url: '/history',
        template: '<history></history>'
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
  // .config([
  //   '$compileProvider',
  //   function($compileProvider) {
  //     $compileProvider.debugInfoEnabled(false)
  //   }
  // ])
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
