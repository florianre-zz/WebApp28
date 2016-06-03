'use strict'

var feedControllers = angular.module('feedControllers');

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

    // Convert date to be suitable for filtering
     $scope.convertFilterDate = function () {
       if($scope.filterDate == "") {
         return "";
       }
       var convertedDate = moment($scope.filterDate, 'dddd DD MMMM YYYY').format('YYYY-MM-DD');
       return convertedDate;
     };
  }]);
