'use strict';

/* Controllers */

var feedControllers = angular.module('feedControllers', []);

feedControllers.controller('feedController', ['$scope', '$http', '$filter',
  function($scope, $http, $filter) {
    $scope.getFeedScope = function() {
         return $scope;
    };

    // Get all feeds elements when created
    $scope.events = [];

    $scope.createSport = "";
    $scope.createDate = "";
    $scope.createStartTime = "";
    $scope.createEndTime = "";
    $scope.createUniversityLocation = "";
    $scope.createLocation = "";
    $scope.createNeeded = "";
    $scope.createMinimum = ""
    $scope.createAdditional = "";

    $scope.createEvent = function() {
      var event =
        {
          "sport": $scope.createSport,
          "date": $scope.createDate,
          "start_time": $scope.createStartTime,
          "end_time": $scope.createEndTime,
          "university_location": $scope.createUniversityLocation,
          "location": $scope.createLocation,
          "needed": $scope.createNeeded,
          "min_participants": $scope.createMinimum,
          "additional_info": $scope.createAdditional,
        }

      $http({
        method: 'POST',
        url: '/events.json',
        data: event
      }).then(function(response) {
        // TODO: change as not efficient but need to get name
        // $scope.events.push(event);
        $scope.getEvents()
      },
      function(response) {
        // TODO: Error handling to do
        alert("Failed to add events");
      });
    };

    // Get all events from database
    $scope.getEvents = function() {
      $http({
        method: 'GET',
        url: '/events.json'
      }).then(function(response) {
        $scope.events = response.data;
      },
      function(response) {
        // TODO: Error handling to do
        alert("Failed to retrieve events");
      });
    };

    // Get all universities name from database
    $scope.getUniversities = function() {
      $http({
        method: 'GET',
        url: '/university_mails.json'
      }).then(function(response) {
        $scope.universities = response.data;
      },
      function(response) {
        // TODO: Error handling to do
        alert("Failed to get all universities");
      });
    };

      $scope.searchUniversity = "";
      $scope.selectedUni = "";
      $scope.universities = [];

      $scope.universityInputValue = "";
      $scope.inputUniversityModified = function (userInput) {
        $scope.universityInputValue = userInput;
      };
      $scope.universitySelected = function (selectedInfo) {
          if(selectedInfo != undefined) {
            $scope.filterUniversity = selectedInfo.title;
          } else if ($scope.universityInputValue == "") {
            $scope.filterUniversity = "";
          }
      };

      $scope.filterUniversity = "";

      $scope.selectedSport = "All Sports";
      $scope.filterSport = "";

      $scope.updateSport = function(name) {
        $scope.selectedSport = name;
        if(name == "All Sport")  {
          $scope.filterSport = "";
        } else {
          $scope.filterSport = name;
        }
      };
      $scope.sports = [
        {
          "name":"All Sport"
        },
        {
          "name":"Dance"
        },
        {
          "name":"Tennis"
        },
        {
          "name":"Football"
        },
        {
          "name":"Running"
        },
        {
          "name":"Baseball"
        }
      ];

      $scope.removeFilters = function() {
        $scope.filterSport = "";
        $scope.filterUniversity = "";
        $scope.$broadcast('angucomplete-alt:clearInput', 'universitySelection');
        $scope.filterDate = "";
        $scope.selectedSport = "All Sport";
      };

      $scope.filterDate = "";

      $scope.getSearchUniversities = function() {
        if($scope.searchUniversity == "") {
          return [];
        } else {
          return $scope.universities;
        }
      };

      // Initialisation of the pahe
      $scope.init = function() {
        // Get all events to display on feed
        $scope.getEvents();

        // Get all universities for autocomplete
        $scope.getUniversities();
      };
  }]);
