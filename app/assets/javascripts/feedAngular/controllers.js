'use strict';

/* Controllers */

var feedControllers = angular.module('feedControllers', []);

feedControllers.controller('feedPageController', ['$scope', '$http', '$filter',
  function($scope, $http, $filter) {

    $scope.getFeedScope = function() {
         return $scope;
    };

    // Initialisation of the pahe
    $scope.init = function() {
      // Get all events to display on feed
      $scope.getEvents();

      // Get all universities for autocomplete
      $scope.getUniversities();
    };

    // Get all feeds elements and universities when created
    $scope.events = [];
    $scope.universities = [];

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

      $scope.filterUniversity = "";
      $scope.filterSport = "";
      $scope.filterDate = "";
  }]);


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
        $scope.universityInputValue = "";
        $scope.inputUniversityModified = function (userInput) {
          $scope.universityInputValue = userInput;
        };
        $scope.universitySelected = function (selectedInfo) {
            if(selectedInfo != undefined) {
              $scope.getFeedScope().filterUniversity = selectedInfo.title;
            } else if ($scope.universityInputValue == "") {
              $scope.getFeedScope().filterUniversity = "";
            }
        };
  }]);


  //TODO create service to put shared data
  // Controller of the pop up to create a new event
  feedControllers.controller('createEventController', ['$scope', '$http',
    function($scope, $http) {

      $scope.getFeedScope = function() {
           return $scope.$parent.getFeedScope();
      };

        // Initialisation of all event characteristics
        $scope.event = {
          "sport": "Tennis",
          "date": "04-05-2016",
          "start_time": "16:00:00",
          "end_time": "17:00:00",
          "university_location": "Imperial",
          "location": "Imperial",
          "needed": 2,
          "additional_info": "Bring racket"
        }

        // Creating a new event
        $scope.createEvent = function() {
          $http({
            method: 'POST',
            url: '/events.json',
            data: $scope.event
          }).then(function(response) {
            var duplicateEvent = jQuery.extend(true, {}, $scope.event)
            $scope.getFeedScope().events.push(duplicateEvent);
          },
          function(response) {
            // TODO: Error handling to do
            alert("Failed to add events");
          });
        };
  }]);

  // Controllers for the list of event
  feedControllers.controller('eventListController', ['$scope', '$http',
    function($scope, $http) {

  }]);
