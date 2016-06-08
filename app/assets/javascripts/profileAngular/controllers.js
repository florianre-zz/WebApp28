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

    $scope.eventStatus = function(event) {
      if(event.status == "confirmed") {
        return "event_confirmed";
      } else if (event.status == "pending") {
        return "event_pending";
      } else if (event.status == "unseen") {
        return "event_unseen";
      }
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

    $scope.eventStatus = function(event) {
      if(event.status == "confirmed") {
        return "event_confirmed";
      } else if (event.status == "pending") {
        return "event_pending";
      } else if (event.status == "unseen") {
        return "event_unseen";
      }
    };
  }
]);

profileControllers.controller('participantSelectionController', ['$scope', '$http',
  function($scope, $http) {

    $scope.eventParticipants = [];
    var currentEventId = "";

    $scope.displayEventParticipants = function(event_id) {
      $http({
        method: 'GET',
        url: '/profile/event_join_demands.json',
        params: {
          "event_id": event_id
        }
      }).then(function(response) {
        currentEventId = event_id;
        $scope.clearEventParticipants();
        $scope.eventParticipants = $scope.eventParticipants.concat(response.data);
        $('#select_participants').modal('toggle');
      },
      function(response) {
        // TODO: Error handling to do
        alert("Failed to retrieve event participants");
      });
    };

    $('#select_participants').on('hidden.bs.modal', function (e) {
      $scope.clearEventParticipants();
    });

    $scope.clearEventParticipants = function() {
      $scope.eventParticipants = [];
    };

    $scope.selectParticipant = function(user_id) {
      $http({
        method: 'PUT',
        url: '/event_participants/' + currentEventId,
        params: {
          "user_id": user_id
        }
      }).then(function(response) {
        for (var i = 0; i < $scope.eventParticipants.length; i++) {
          if($scope.eventParticipants[i].id == user_id) {
            $scope.eventParticipants[i].confirmed = 'true';
          }
        };
        for (var i = 0; i < $scope.createdEvents.length; i++) {
          if($scope.createdEvents[i].id == currentEventId) {
            if(parseInt($scope.createdEvents[i].needed) > parseInt($scope.createdEvents[i].participants)) {
              $scope.createdEvents[i].participants = String(parseInt($scope.createdEvents[i].participants) + 1);
            }
          }
        };
      },
      function(response) {
        // TODO: Error handling to do
        alert("Failed to retrieve joined events");
      });
    };

    $scope.removeParticipant = function (user_id) {
      $http({
        method: 'DELETE',
        url: '/event_participants/' + currentEventId,
        params: {
          "user_id": user_id
        }
      }).then(function(response) {
        for (var i = 0; i < $scope.eventParticipants.length; i++) {
          if($scope.eventParticipants[i].id == user_id) {
            $scope.eventParticipants.splice(i, 1);
          }
        }
      },
      function(response) {
        // TODO: Error handling to do
        alert("Failed to delete joined events");
      });
    };

    $scope.participantConfirmed = function(participant) {
      return participant.confirmed == 'true'
    };
  }
]);

profileControllers.controller('profileController', ['$scope', '$http',
  function($scope, $http) {

    $scope.test = function () {
      $http({
        method: 'GET',
        url: '/profile.json'
      }).then(function(response) {
        console.log(response.data);
      },
      function(response) {
        // TODO: Error handling to do
        alert("Failed to delete joined events");
      });
    };

  }])
