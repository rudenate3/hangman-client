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
  })
  .config([
    '$locationProvider',
    $locationProvider => {
      $locationProvider.html5Mode(true)
    }
  ])
