'use strict'

angular
  .module('hangman', ['ui.router'])
  .config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/')

    $stateProvider
      .state('home', {
        url: '/',
        component: 'home'
      })
      .state('login', {
        url: '/login',
        component: 'login'
      })
      .state('register', {
        url: '/register',
        component: 'register'
      })
      .state('changePassword', {
        url: '/change-password',
        component: 'change-password'
      })
      .state('game', {
        url: '/game',
        component: 'game'
      })
      .state('history', {
        url: '/history',
        component: 'history'
      })
  })
  .config($locationProvider => {
    $locationProvider.html5Mode(true)
  })
  .config($httpProvider => {
    $httpProvider.interceptors.push('authInterceptor')
  })
  // .config([
  //   '$compileProvider',
  //   function($compileProvider) {
  //     $compileProvider.debugInfoEnabled(false)
  //   }
  // ])
  .factory('authInterceptor', ($rootScope, Auth) => {
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
