'use strict';

/* Controllers */

var feedControllers = angular.module('feedControllers', []);

feedControllers.controller('feedController', ['$scope', '$http',
  function($scope, $http) {
    $scope.getFeedScope = function() {
         return $scope;
    };

    $scope.createSport = "";
    $scope.createUniversity = "";
    $scope.createDate = "";
    $scope.createStartTime = "";
    $scope.createEndTime = "";
    $scope.createLocation = "";
    $scope.createNeeded = "";
    $scope.createMinimum = ""
    $scope.createAdditional = "";

    $scope.createEvent = function() {
      $http({
        method: 'POST',
        url: '/events.json',
        data:
        {
          "sport": $scope.createSport,
          "university": $scope.createUniversity,
          "date": $scope.createDate,
          "start_time": $scope.createStartTime,
          "end_time": $scope.createEndTime,
          "location": $scope.createLocation,
          "additional_info": $scope.createAdditional,
          "needed": $scope.createNeeded,
          "min_participants": $scope.createMinimum
        }
      }).then(function(response) {
        $scope.events.push({
          "id": "Paul Vidal",
          "sport": $scope.createSport,
          "university": $scope.createUniversity,
          "date": $scope.createDate,
          "start_time": $scope.createStartTime,
          "end_time": $scope.createEndTime,
          "location": $scope.createLocation,
          "additional_info": $scope.createAdditional,
          "needed": $scope.createNeeded,
          "min_participants": $scope.createMinimum
        });
      },
      function(response) {
        alert("it did not work");
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
        alert("it did not work");
      });
    };

    $scope.events = [
      {
        "sport": "Tennis",
        "date": "2016/07/02",
        // "start_time": "14:00:00",
        // "end_time": "15:00:00",
        "location": "Hyde Park, meet at Ethos in front of Imperial",
        "additional_info": "Please bring a racket, see you there!",
        "needed": "1",
        "id": "Paul Vidal",
        "university": "Imperial College London",
      },
      {
        "sport": "Running",
        "university": "King's College London",
        "date": "2016/07/21",
        // "start_time": "16:30:00",
        // "end_time": "17:00:00",
        "location": "Battersea Park",
        "additional_info": "See you there!",
        "needed": "1",
        "id": "Corentin Herbinet",
      },
      {
        "sport": "Football",
        "university": "University College London",
        "date": "2016/06/28",
        // "start_time": "10:00:00",
        // "end_time": "12:00:00",
        "location": "Westway Sports Centre",
        "additional_info": "Can someone bring a football please?",
        "needed": "9",
        "id": "Florian Emile",
      }
    ];

      $scope.searchUniversity = "";
      $scope.selectedUni = "";
      $scope.universities = [
        {
          "name":"Imperial College London"
        },
        {
          "name":"University College London"
        },
        {
          "name":"London School of Economics"
        },
        {
          "name":"King's College London"
        },
        {
          "name":"Queen Mary University"
        },
        {
          "name":"City University London"
        },
        {
          "name":"Royal Holloway University"
        }
      ];

      $scope.filterUniversity = "";

      $scope.selectedSport = "All Sport";
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
  }]);
