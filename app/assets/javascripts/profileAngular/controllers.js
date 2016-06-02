'use strict';

/* Controllers */

var profileControllers = angular.module('profileControllers', []);

profileControllers.controller('createdEventsController', ['$scope', '$http',
  function($scope, $http) {

    $scope.getFeedScope = function() {
      return $scope;
    };

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

    $scope.getFeedScope = function() {
      return $scope;
    };

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