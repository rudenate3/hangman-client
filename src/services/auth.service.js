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
      }
    }
  })
