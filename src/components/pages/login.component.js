'use strict'

angular.module('hangman').component('login', {
  templateUrl: '/src/components/pages/templates/login.tmpl.html',
  controller: function(Auth) {
    this.submit = user => {
      Auth.login(user.username, user.password)
    }
  }
})
