angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$http,$rootScope,$state) {
    var date = new Date();
    console.log(date);
    console.log("we zitten in de dashCtrl")
    $http({
      method: 'GET',
      url: 'http://phpapialex.azurewebsites.net/getContacts.php'
    }).then(function successCallback(response) {
      console.log(response);
      $rootScope.users = response.data;
      var date2 = new Date();
      console.log(date2);
      var test = date2.getTime()-date.getTime();
      var secondsDifference = test/1000;
      alert("time 100 gebruikers: " + secondsDifference );
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });

  $scope.add = function () {
    $state.go('tab.newuser');
    $rootScope.time1 = new Date();
  }

})

  .controller('DashDetailCtrl', function($scope, $stateParams,$state,$http,$rootScope,$ionicNavBarDelegate) {
    $ionicNavBarDelegate.showBackButton(true)
    console.log($stateParams.dashid);
    var date = new Date();
    console.log(date);
    $http({
      method: 'GET',
      url: 'http://phpapialex.azurewebsites.net/getContact.php',
      params:{id:$stateParams.dashid}
    }).then(function successCallback(response) {

      $scope.user = response.data[0];

      console.log($scope.user);
      var date2 = new Date();
      console.log(date2);
      var test = date2.getTime()-date.getTime();
      var secondsDifference = test/1000;
      alert("time 1 gebruiker: " + secondsDifference );


    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });


    $scope.update= function(){
      var date = new Date();
      console.log(date);

      $http({
        method:'POST',
        url: 'http://phpapialex.azurewebsites.net/updateContact.php',
        data:{
          id:$stateParams.dashid,
          first_name:$scope.user.first_name,
          last_name:$scope.user.last_name,
          email: $scope.user.email,
          gender : $scope.user.gender,
          ip_address: $scope.user.ip_address
        },
       headers : {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function successCallback(response) {
        var date2 = new Date();
        console.log("contact geupdate");
        $rootScope.users = response.data;
        $state.go("tab.dash");


        console.log(date2);
        var test = date2.getTime()-date.getTime();
        var secondsDifference = test/1000;
        alert("update gebruiker: " + secondsDifference );


      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

    }

    $scope.remove = function(){

      var date = new Date();
      console.log(date);

      $http({
        method:'POST',
        url: 'http://phpapialex.azurewebsites.net/verwijderContact.php',
        data:{
          id:$stateParams.dashid,
        },
        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function successCallback(response) {

        var date2 = new Date();
        console.log("contact verwijderd");
        $rootScope.users = response.data;
        $state.go("tab.dash");

        console.log(date2);
        var test = date2.getTime()-date.getTime();
        var secondsDifference = test/1000;
        alert("verwijderen gebruiker: " + secondsDifference );


      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    }

  })

  .controller('DashDaddCtrl', function($scope,$http,$rootScope,$ionicNavBarDelegate,$state) {
    $ionicNavBarDelegate.showBackButton(false);
    $scope.user = {};

    var time2 = new Date();
    var timediference = time2.getTime()-$rootScope.time1.getTime();
    var secondsDifference = timediference/1000;
    alert("veranderen pagina: " + secondsDifference );



    console.log("we zitten in de add ctrl")

    $scope.close = function(){
      $state.go("tab.dash");
    };

    $scope.add = function(){
          console.log("toegevoegd!!");
          var date = new Date();

          $http({
            method:'POST',
            url: 'http://phpapialex.azurewebsites.net/addContact.php',
            data:{
              first_name:$scope.user.first_name,
              last_name:$scope.user.last_name,
              email: $scope.user.email,
              gender : $scope.user.gender,
              ip_address: $scope.user.ip_address
            },
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}
          }).then(function successCallback(response) {

            var date2 = new Date();
            console.log("contact toegevoegd");
            $rootScope.users = response.data;
            $state.go("tab.dash");

            console.log(date2);
            var test = date2.getTime()-date.getTime();
            var secondsDifference = test/1000;
            alert("toevoegen gebruiker: " + secondsDifference );


          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
    };
  })

.controller('ChatsCtrl', function($scope,$state,$cordovaGeolocation ) {

  var date = new Date();

  $scope.loc = {};
  $scope.loc.lat ="";
  $scope.loc.long = "";

  var options = {timeout: 10000, enableHighAccuracy: true};

  $scope.getlocation = function(){
    $cordovaGeolocation.getCurrentPosition(options).then(function(position){

        var date2 = new Date();
        var test = date2.getTime()-date.getTime();
        var secondsDifference = test/1000;
        alert("laden map: " + secondsDifference );

        $scope.loc.lat = position.coords.latitude;
        $scope.loc.long = position.coords.longitude;
        $scope.$apply();


    },function(error){
      console.log("could not get date");
    });
  };

  /*$cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };




    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);


    google.maps.event.addListenerOnce($scope.map, 'idle', function(){

      var marker = new google.maps.Marker({
        map: $scope.map,
        animation: google.maps.Animation.DROP,
        position: latLng
      });

      var infoWindow = new google.maps.InfoWindow({
        content: "Here I am!"
      });

      google.maps.event.addListener(marker, 'click', function () {
        infoWindow.open($scope.map, marker);
      });

      var date2 = new Date();
      var test = date2.getTime()-date.getTime();
      var secondsDifference = test/1000;
      alert("laden map: " + secondsDifference );


    });

  }, function(error){
    console.log("Could not get location");
  });*/
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

