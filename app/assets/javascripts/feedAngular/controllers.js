'use strict';

/* Controllers */

var feedModule = angular.module('feedModule', []);

feedModule.controller('feedController', ['$scope', '$http',
  function($scope, $http) {
    // $scope.request = $http.post('/events/create', {"params": {"sport": "tennis", "date": "3 janvier", "start_time":"3 juillet", "end_time":"4 janvier", "location": "paris", "additional_info":"info", "needed":"2 persons", "min_participants":"2"}})
    // .then(function(response) {
    //   alert("it worked");
    // },
    // function(response) {
    //   alert("it did not work");
    // });
    $scope.events = [
      {
        "sport": "tennis",
        "date": "Thurday 12 February 2016, 2pm",
        "needed": "1 person needed",
        "place": "Hyde Park, meet at Ethos in front of Imperial",
        "id": "Posted by Paul Vidal",
        "university":"imperial"
      },
      {
        "sport": "dance",
        "date": "Thurday 6 February 2014, 6am",
        "needed": "100 person needed",
        "place": "Waterloo, meet at UCL",
        "id": "Posted by Corentin Herbinet",
        "university":"lse"
      },
      {
        "sport": "football",
        "date": "Monday 3 jauary 2016, 3pm",
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
      $scope.updateFilterUniversity = function() {
        $scope.filterUniversity = $scope.searchUniversity;
      }

      $scope.getSearchUniversities = function() {
      if($scope.searchUniversity == "") {
        return [];
      } else {
        return $scope.universities;
      }
    };
  }]);
