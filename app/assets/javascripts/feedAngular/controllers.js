'use strict';

/* Controllers */

var feedModule = angular.module('feedModule', []);

feedModule.controller('feedController', ['$scope', '$http',
  function($scope, $http) {
    $scope.getFeedScope = function() {
         return $scope;
    };

    $scope.createSport = "";
    $scope.createDate = "";
    $scope.createStartTime = "";
    $scope.createEndTime = "";
    $scope.createLocation = "";
    $scope.createNeeded = "";
    $scope.createMinimum = "1"
    $scope.createAdditional = "See you soon !!!!!!!!!!!!!!!!!!!";

    $scope.createEvent = function() {
      $http({
        method: 'POST',
        url: '/events.json',
        data:
        {
          "sport": $scope.createSport,
          "date": $scope.createDate,
          "start_time": $scope.createStartTime,
          "end_time": $scope.createEndTime,
          "location": $scope.createLocation,
          "additional_info": $scope.createAdditional,
          "needed": $scope.createNeeded,
          "min_participants": $scope.createMinimum
        },
        headers: { 'Content-Type' : 'application/json' }
      }).then(function(response) {
        alert("it worked");
      },
      function(response) {
        alert("it did not work");
      });
    };

    $scope.events = [
      {
        "sport": "tennis",
        "date": "2016-01-02",
        "needed": "1 person needed",
        "place": "Hyde Park, meet at Ethos in front of Imperial",
        "id": "Posted by Paul Vidal",
        "university":"imperial"
      },
      {
        "sport": "dance",
        "date": "2017-01-02",
        "needed": "100 person needed",
        "place": "Waterloo, meet at UCL",
        "id": "Posted by Corentin Herbinet",
        "university":"lse"
      },
      {
        "sport": "football",
        "date": "2016/06/02",
        "needed": "2 person needed",
        "place": "Liverpool, meet in Paris",
        "id": "Posted by Floriant Emile",
        "university":"ucl"
      }
      ]
      $scope.searchUniversity = "";
      $scope.selectedUni = "";
      $scope.universities = [
        {
          "name":"imperial"
        },
        {
          "name":"ucl"
        },
        {
          "name":"lse"
        },
        {
          "name":"teds"
        },
        {
          "name":"sdds"
        },
        {
          "name":"sddsds"
        },
        {
          "name":"yolqdfbtay"
        },
        {
          "name":"rztsbgbs"
        },
        {
          "name":"ustbsbscl"
        },
      ];

      $scope.filterUniversity = "";

      $scope.sports = [
        {
          "name":"dance"
        },
        {
          "name":"tennis"
        },
        {
          "name":"football"
        },
        {
          "name":"moto"
        },
        {
          "name":"baseball"
        }
      ];

      $scope.filterSport = "";
      $scope.removeFilters = function() {
        $scope.filterSport = "";
        $scope.filterUniversity = "";
        $scope.filterDate = "";
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
