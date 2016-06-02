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
    // Initialising filters
    $scope.filterUniversity = "";
    $scope.filterSport = "";
    $scope.filterDate = "";

    // TODO put in a service interaction with database
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
        };
        $scope.universitySelected = function (selectedInfo) {
            if(selectedInfo != undefined) {
              $scope.getFeedScope().filterUniversity = selectedInfo.title;
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
          "date": "06-07-2016",
          "start_time": "16:00:00",
          "end_time": "17:00:00",
          "university_location": "Imperial College London",
          "location": "Hyde Park Tennis Courts",
          "needed": 1,
          "additional_info": "Bring a racket and 5 pounds!"
        }

        // Creating a new event
        $scope.createEvent = function() {
          $http({
            method: 'POST',
            url: '/events.json',
            data: $scope.event
          }).then(function(response) {
            $scope.getFeedScope().getEvents();
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

      // Person join an event
      $scope.joinEvent = function(event_id) {
        $http({
          method: 'POST',
          url: '/event_participants.json',
          data: {
            "event_id": event_id,
            "participants": 1,
            "message": ""
          }
        }).then(function(response) {
          // TODO: success message
          alert("Successfully created events");
        },
        function(response) {
          // TODO: Error handling to do
          alert("Failed to add events");
        });
      };

      $scope.convertFilterDate = function () {
        if($scope.filterDate == "") {
          return "";
        }
        var convertedDate = moment($scope.filterDate, 'dddd DD MMMM').format('YYYY-MM-DD');
        return convertedDate;
      }
  }]);
