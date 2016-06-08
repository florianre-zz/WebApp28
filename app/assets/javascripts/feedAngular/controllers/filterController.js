'use strict'

var feedControllers = angular.module('feedControllers');

// Controller for the filters
feedControllers.controller('filterController', ['$scope', '$http',
  function($scope, $http) {

      // Bind the clear button from the datepicker to the event list
      $('#dateFilter').datepicker().on('clearDate', function(e) {
        $scope.getFeedScope().$apply(function () {$scope.getFeedScope().filterDate = "";});
      });

      //TODO open a pop up to select the sports
      // Update the sport selected and bind it with the sport filter
      $scope.selectedSport = "All Sports";
      $scope.updateSport = function(name) {
        $scope.selectedSport = name;
        if(name == "All Sport")  {
          $scope.getFeedScope().filterSport = "";
        } else {
          $scope.getFeedScope().filterSport = name;
        }
      };

      // Manage change in university value in the autocomplete filter for university
      $scope.inputUniversityUpdated = function (userInput) {
        if (userInput == "") {
          $scope.getFeedScope().filterLocation = "";
        }
        // TODO remove hardcoding
        // Check whether the input is the user uni to automatically toggle the button
      };
      $scope.universitySelected = function (selectedInfo) {
          if(selectedInfo != undefined) {
            $scope.getFeedScope().filterLocation = selectedInfo.title;
          }
      };

      // TODO do unit test and remove hardcoding
      // Manage the toggle of university
      $(function() {
        $("#universityToggle").change(function() {
          // If ot already in $digest or $apply
          if(!$scope.$$phase) {
            if($(this).prop("checked")) {
              $scope.getFeedScope().filterUniversity = "";
            } else {
              $scope.getFeedScope().filterUniversity = $scope.profileData.university_name;
            }
            $scope.$apply();
          }
        })
      })

      // Profile data retrieval
      $scope.profileData = "";

      // TODO only when connected as a user (do an if)
      $scope.getProfileData = function () {
        $http({
          method: 'GET',
          url: '/feed/user_info.json'
        }).then(function(response) {
          $scope.profileData = response.data[0];
        },
        function(response) {
          // TODO: Error handling to do
          alert("Failed to retrieve profile data");
        });
      };

      // before linking phase
      $scope.getProfileData();

      // Decide if toggle should be shown
      $scope.showToggle = function() {
        return $scope.profileData.university_name != "";
      };
}]);
