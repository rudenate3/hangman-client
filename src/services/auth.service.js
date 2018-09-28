'use strict'

angular
  .module('hangman')
  .factory('Auth', function Auth($location, $rootScope, config) {
    const userPool = new AmazonCognitoIdentity.CognitoUserPool({
      UserPoolId: config.userPoolId,
      ClientId: config.clientId
    })

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
            $location.path('/').replace()
            if (!$rootScope.$$phase) $rootScope.$apply()
          },
          onFailure: function(err) {
            console.error(err)
          }
        })
      },
      isLoggedIn: function() {
        const cognitoUser = userPool.getCurrentUser()

        if (cognitoUser != null) {
          cognitoUser.getSession(function(err, session) {
            if (err) console.error(err)
            return session.isValid()
          })
        }
        return false
      }
    }
  })
