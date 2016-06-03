'use strict'

var feedControllers = angular.module('feedControllers');

// Controller for the filters
feedControllers.controller('filterController', ['$scope', '$http',
  function($scope, $http) {

    // TODO retrieve from db or put in a json file
    $scope.sports = [{"name":"All Sport"},
      {"name":"Dance"},
      {"name":"Tennis"},
      {"name":"Football"},
      {"name":"Running"},
      {"name":"Baseball"}];

      // Bind the clear button from the datepicker to the event list
      $('.date').datepicker().on('clearDate', function(e) {
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
          $scope.getFeedScope().filterUniversity = "";
        }
        // TODO remove hardcoding
        // Check whether the input is the user uni to automatically toggle the button
        if(userInput != "Imperial College London") {
          $('#universityToggle').bootstrapToggle('on');
        } else {
          $('#universityToggle').bootstrapToggle('off');
        }

      };
      $scope.universitySelected = function (selectedInfo) {
          if(selectedInfo != undefined) {
            $scope.getFeedScope().filterUniversity = selectedInfo.title;
          }
      };

      // TODO do unit test and remove hardcoding
      // Manage the toggle of university
      $(function() {
        $("#universityToggle").change(function() {
          // If ot already in $digest or $apply
          if(!$scope.$$phase) {
            if($(this).prop("checked")) {
              $scope.getFeedScope().$broadcast("angucomplete-alt:clearInput", "universitySelection");
              $scope.getFeedScope().filterUniversity = "";
            } else {
              $scope.getFeedScope().$broadcast("angucomplete-alt:changeInput", "universitySelection", "Imperial College London");
              $scope.getFeedScope().filterUniversity = "Imperial College London";
            }
            $scope.$apply();
          }
        })
      })
}]);
