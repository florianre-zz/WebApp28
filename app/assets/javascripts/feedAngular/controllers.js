'use strict';

/* Controllers */

var feedModule = angular.module('feedModule', []);

feedModule.controller('feedController', ['$scope',
  function($scope) {
    $scope.test = "12fqffdfdfdfdfds3456465";
    $scope.events = [
      {
        "sport": "tennis",
        "date": "Thurday 12 February 2016, 2pm",
        "needed": "1 person needed",
        "place": "Hyde Park, meet at Ethos in front of Imperial",
        "id": "Posted by Paul Vidal"
      },
      {
        "sport": "dance",
        "date": "Thurday 6 February 2014, 6am",
        "needed": "100 person needed",
        "place": "Waterloo, meet at UCL",
        "id": "Posted by Corentin Herbinet"
      },
      {
        "sport": "football",
        "date": "Monday 3 jauary 2016, 3pm",
        "needed": "2 person needed",
        "place": "Liverpool, meet in Paris",
        "id": "Posted by Floriant Emile"
      }
    ]
  }]);
