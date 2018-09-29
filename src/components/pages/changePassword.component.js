'use strict'

angular.module('hangman').component('changePassword', {
  templateUrl: '/src/components/pages/templates/change-password.tmpl.html',
  controller: function(Auth) {
    this.changePassword = password => {
      if (password.newPassword !== password.confirm) {
        console.log('does not match')
        return
      }
      Auth.changePassword(password.oldPassword, password.newPassword)
    }
  }
})
