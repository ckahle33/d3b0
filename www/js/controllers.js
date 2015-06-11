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
              });

          console.log(data);
      }, function (error) {
          // error
      });
  }

  $scope.logout = function() {
    $cordovaFacebook.logout(getLoginStatus())
      .then(function(data) {
          console.log('logout >>>', data);
          $scope.userData = null;
          console.log(data);
      }, function (error) {
          // error
      });
  }
})

.controller('MapCtrl', function($scope, $cordovaGeolocation, $ionicPlatform) {
  
  var map;


    var mapOptions = {
      zoom: 4,
      center: new google.maps.LatLng(40.8833, -90.0167)
    };

    map = new google.maps.Map(document.getElementById('map'),
        mapOptions);

    var positionOptions = {
      timeout: 1000,
      enableHighAccuracy: false
    };

    function addMarker(location) {
      console.log('firing')

    }

      $cordovaGeolocation.getCurrentPosition(positionOptions)
        .then(function(pos){
          console.log(pos);

          // var options = {
          //   zoom: 7,
          //   center: new )
          // }
          
          // addMarker({latitude: pos.coords.latitude, longitude: pos.coords.longitude});

          // //initialize the map once we have device coordinates
          // $scope.map = new google.maps.Map(document.getElementById('map'), options);

        }, function(err){
          console.log(err);
        });

    
      function onSuccess(pos) {
        console.log(pos);
        $scope.newLatitude = pos.coords.latitude;
        $scope.newLongitude = pos.coords.longitude;

        var mapPosition = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude)

        // show inital location pin
        var marker = new google.maps.Marker({
            position: mapPosition, 
            map: map
          })

        // zoom in on our marker
        map.setZoom(10);
        map.panTo(marker.position);

        $scope.$watch(function(mapPosition){
          //original value??
        }, function(newValue, oldValue){
            var marker = new google.maps.Marker({
            position: newValue, 
            map: map,
            zoom: 8
          })
        })
      }

      // onError Callback receives a PositionError object
      //
      function onError(error) {
        console.log(error);
      }

      // Options: throw an error if no update is received every 30 seconds.
      //
      var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { frequency: 1000, timeout: 1000 });

      //   $cordovaGeolocation.clearWatch(watch.watchId);

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
