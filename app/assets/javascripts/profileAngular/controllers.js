'use strict';

/* Controllers */

var profileControllers = angular.module('profileControllers', []);

profileControllers.controller('createdEventsController', ['$scope', '$http',
  function($scope, $http) {

    // Initialisation of the page
    $scope.init = function() {
      // Get events created to display on profile
      $scope.getCreatedEvents();
    };

    $scope.createdEvents = [];

    $scope.hasCreatedEvents = function() {
      return $scope.createdEvents.length != 0;
    }

    // Get created events from database
    $scope.getCreatedEvents = function() {
      $http({
        method: 'GET',
        url: '/profile/created_events.json'
      }).then(function(response) {
        $scope.createdEvents = response.data;
      },
      function(response) {
        // TODO: Error handling to do
        alert("Failed to retrieve created events");
      });
    };

  }
]);

profileControllers.controller('joinedEventsController', ['$scope', '$http',
  function($scope, $http) {

    // Initialisation of the page
    $scope.init = function() {
      // Get events joined to display on profile
      $scope.getJoinedEvents();
    };

    $scope.joinedEvents = [];

    $scope.hasJoinedEvents = function() {
      return $scope.joinedEvents.length != 0;
    }

    // Get created events from database
    $scope.getJoinedEvents = function() {
      $http({
        method: 'GET',
        url: '/profile/joined_events.json'
      }).then(function(response) {
        $scope.joinedEvents = response.data;
      },
      function(response) {
        // TODO: Error handling to do
        alert("Failed to retrieve joined events");
      });
    };

  }
]);

profileControllers.controller('participantSelectionController', ['$scope', '$http',
  function($scope, $http) {

    $scope.eventParticipants = [{"first_name": "test"}];

    $scope.$watch('eventParticipants', function (newval) {
      console.log("changed eventparticipants");
      console.log(newval);
    });

    $scope.getEventParticipants = function(event_id) {
      $http({
        method: 'GET',
        url: '/profile/event_join_demands.json',
        params: {
          "event_id": event_id
        }
      }).then(function(response) {
        $scope.eventParticipants.push(response.data);
      },
      function(response) {
        // TODO: Error handling to do
        alert("Failed to retrieve event participants");
      });
    };


    $scope.clearEventParticipant = function() {

    };

    $scope.clearEventParticipants = function() {
      // $scope.eventParticipants = [];
    };

    $scope.selectParticipants = function() {
      // $http({
      //   method: 'POST',
      //   url: '/profile/joined_events.json'
      // }).then(function(response) {
      //   $scope.joinedEvents = response.data;
      // },
      // function(response) {
      //   // TODO: Error handling to do
      //   alert("Failed to retrieve joined events");
      // });
    };

  }
]);
