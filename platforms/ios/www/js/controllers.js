angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$http,$rootScope,$state) {
    console.log("we zitten in de dashCtrl")
    $http({
      method: 'GET',
      url: 'http://phpapialex.azurewebsites.net/getContacts.php'
    }).then(function successCallback(response) {
      console.log(response);
      $rootScope.users = response.data;
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });

  $scope.add = function () {
    $state.go('tab.newuser');
  }

})

  .controller('DashDetailCtrl', function($scope, $stateParams,$state,$http,$rootScope,$ionicNavBarDelegate) {
    $ionicNavBarDelegate.showBackButton(true)
    console.log($stateParams.dashid);

    $http({
      method: 'GET',
      url: 'http://phpapialex.azurewebsites.net/getContact.php',
      params:{id:$stateParams.dashid}
    }).then(function successCallback(response) {

      $scope.user = response.data[0];

      console.log($scope.user);

    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });


    $scope.update= function(){

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

        console.log("contact geupdate");
        updateContacts();
        $state.go("tab.dash");


      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

    }

    $scope.remove = function(){
      $http({
        method:'POST',
        url: 'http://phpapialex.azurewebsites.net/verwijderContact.php',
        data:{
          id:$stateParams.dashid,
        },
        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function successCallback(response) {

        console.log("contact verwijderd");
        updateContacts();
        $state.go("tab.dash");


      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    }

    function updateContacts(){
      $http({
        method: 'GET',
        url: 'http://phpapialex.azurewebsites.net/getContacts.php'
      }).then(function successCallback(response) {

        $rootScope.users = response.data;
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    }


  })

  .controller('DashDaddCtrl', function($scope,$http,$rootScope,$ionicNavBarDelegate,$state) {
    $ionicNavBarDelegate.showBackButton(false);
    $scope.user = {};


    console.log("we zitten in de add ctrl")

    $scope.close = function(){
      $state.go("tab.dash");
    };

    $scope.add = function(){
          console.log("toegevoegd!!");
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

            console.log("contact toegevoegd");
            updateContacts();
            $state.go("tab.dash");


          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
    };

    function updateContacts(){

      $rootScope.users = {};

      $http({
        method: 'GET',
        url: 'http://phpapialex.azurewebsites.net/getContacts.php'
      }).then(function successCallback(response) {

        $rootScope.users = response.data;
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    }

  })

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

