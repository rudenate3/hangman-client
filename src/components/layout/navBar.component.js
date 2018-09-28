'use strict'

angular.module('hangman').component('navBar', {
  templateUrl: '/src/components/layout/templates/navBar.tmpl.html',
  controller: function(Auth) {
    this.loggedIn = Auth.isLoggedIn()
  }
})
