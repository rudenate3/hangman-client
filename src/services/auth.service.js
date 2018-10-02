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
      cognitoUser.getSession((err, session) => {
        if (err) console.error(err)
        $rootScope.loggedIn = session.isValid()
        $rootScope.$broadcast('authStateChange')
      })
    }

    const redirectTo = path => {
      $location.path(path).replace()
      if (!$rootScope.$$phase) $rootScope.$apply()
    }

    return {
      register: (email, username, password) => {
        const attribute = {
            Name: 'email',
            Value: email
          },
          attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(
            attribute
          ),
          attributeList = []

        attributeList.push(attributeEmail)
        userPool.signUp(
          username,
          password,
          attributeList,
          null,
          (err, result) => {
            if (err) console.error(err)
            if (result) {
              redirectTo('/login')
            }
          }
        )
      },
      login: (username, password) => {
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
          onSuccess: result => {
            $rootScope.loggedIn = true
            $rootScope.$broadcast('authStateChange')
            redirectTo('/game')
          },
          onFailure: err => {
            console.error(err)
          }
        })
      },
      logout: () => {
        const cognitoUser = userPool.getCurrentUser()

        if (cognitoUser != null) {
          $rootScope.loggedIn = false
          $rootScope.$broadcast('authStateChange')
          cognitoUser.signOut()
          redirectTo('/')
        }
      },
      changePassword: (oldPassword, newPassword) => {
        const userToChange = userPool.getCurrentUser()

        console.log(userToChange)
        if (userToChange != null) {
          userToChange.changePassword(
            oldPassword,
            newPassword,
            (err, result) => {
              if (err) console.error(err)
              if (result) {
                redirectTo('/')
              }
            }
          )
        }
      },
      getAccessToken: () => {
        const cognitoUser = userPool.getCurrentUser()

        if (cognitoUser != null) {
          return cognitoUser.getSession((err, session) => {
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
