'use strict'

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
