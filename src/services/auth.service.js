'use strict'

angular
  .module('hangman')
  .factory('Auth', function Auth($location, $rootScope, config) {
    const userPool = new AmazonCognitoIdentity.CognitoUserPool({
      UserPoolId: config.userPoolId,
      ClientId: config.clientId
    })

    $rootScope.loggedIn = false

    const cognitoUser = userPool.getCurrentUser()

    if (cognitoUser != null) {
      cognitoUser.getSession(function(err, session) {
        if (err) console.error(err)
        $rootScope.loggedIn = session.isValid()
        $rootScope.$broadcast('authStateChange')
      })
    }

    return {
      register: function(email, username, password) {
        const attribute = {
            Name: 'email',
            Value: email
          },
          attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(
            attribute
          ),
          attributeList = []

        attributeList.push(attributeEmail)
        userPool.signUp(username, password, attributeList, null, function(
          err,
          result
        ) {
          if (err) console.error(err)
          if (result) {
            $location.path('/login').replace()
            if (!$rootScope.$$phase) $rootScope.$apply()
          }
        })
      },
      login: function(username, password) {
        const authenticationData = {
            Username: username,
            Password: password
          },
          authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
            authenticationData
          ),
          userData = {
            Username: username,
            Pool: userPool
          },
          cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)

        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: function(result) {
            $rootScope.loggedIn = true
            $rootScope.$broadcast('authStateChange')
            $location.path('/').replace()
            if (!$rootScope.$$phase) $rootScope.$apply()
          },
          onFailure: function(err) {
            console.error(err)
          }
        })
      },
      logout: function() {
        const cognitoUser = userPool.getCurrentUser()

        if (cognitoUser != null) {
          $rootScope.loggedIn = false
          $rootScope.$broadcast('authStateChange')
          cognitoUser.signOut()
        }
      },
      changePassword: function(oldPassword, newPassword) {
        const userToChange = userPool.getCurrentUser()

        console.log(userToChange)
        if (userToChange != null) {
          userToChange.changePassword(oldPassword, newPassword, function(
            err,
            result
          ) {
            if (err) console.error(err)
            if (result) {
              $location.path('/').replace()
              if (!$rootScope.$$phase) $rootScope.$apply()
            }
          })
        }
      },
      getAccessToken: function() {
        const cognitoUser = userPool.getCurrentUser()

        if (cognitoUser != null) {
          return cognitoUser.getSession(function(err, session) {
            if (err) {
              alert(err)
              return null
            }
            return session.idToken.jwtToken
          })
        }
      }
    }
  })
