angular.module('hangman').component('register', {
  templateUrl: '/src/components/pages/templates/register.tmpl.html',
  controller: function(Auth) {
    this.submit = user => {
      if (user.password !== user.confirm) {
        console.log('does not match')
        return
      }
      Auth.register(user.email, user.username, user.password)
    }
  }
})
