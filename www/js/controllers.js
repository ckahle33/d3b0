angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $cordovaFacebook, $ionicPlatform) {


        function getLoginStatus() {
            return $cordovaFacebook.getLoginStatus()
                .then(function(success) {

                }, function (error) {
                    // error
                });


        }

    $scope.login = function() {
        $cordovaFacebook.login(["public_profile", "email", "user_friends"])
            .then(function(data) {
                $cordovaFacebook.api("me", ["public_profile"])
                    .then(function(success){
                        console.log(success);
                        $scope.userData = success;
                    }, function(err){
                        console.log('fb API >>>', err);

                    })

                console.log(data);
            }, function (error) {
                // error
            });
    }

    $scope.logout = function() {
        $cordovaFacebook.logout(getLoginStatus())
            .then(function(data) {
                console.log('logout >>>', data);

                console.log(data);
            }, function (error) {
                // error
            });

    }

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
