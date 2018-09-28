'use strict'

angular.module('hangman').component('navBar', {
  templateUrl: '/src/components/layout/templates/navBar.tmpl.html',
  controller: function(Auth, $rootScope) {
    this.isLoggedIn = $rootScope.loggedIn

    $rootScope.$on('authStateChange', () => {
      this.isLoggedIn = $rootScope.loggedIn
    })

    this.onLogoutClick = () => {
      Auth.logout()
    }
  }
})
