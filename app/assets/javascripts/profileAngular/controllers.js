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

    // Return a boolean telling if the additional info is empty
    $scope.hasAdditionalInfos = function (additional_info) {
      return additional_info.length != 0;
    };

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

    $scope.hasBeenConfirmed = function(status) {
      return status == "confirmed";
    }

    // Return a boolean telling if the additional info is empty
    $scope.hasAdditionalInfos = function (additional_info) {
      return additional_info.length != 0;
    };

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
    var currentCreatedEventId = "";
    function getCreatedEventById(event_id) {
      for (var i = 0; i < $scope.createdEvents.length; i++) {
        if($scope.createdEvents[i].id == event_id) {
          return $scope.createdEvents[i];
        }
      };
    }

    function getParticipantsById(user_id) {
      for (var i = 0; i < $scope.eventParticipants.length; i++) {
        if($scope.eventParticipants[i].id == user_id) {
          return $scope.eventParticipants[i];
        }
      };
    }

    function getParticipantsIndex(user_id) {
      for (var i = 0; i < $scope.eventParticipants.length; i++) {
        if($scope.eventParticipants[i].id == user_id) {
          return i;
        }
      };
    }

    $scope.getSpaceLeft = function() {
      var createdEvent = getCreatedEventById(currentCreatedEventId);
      if(createdEvent == undefined) {
        return -1;
      }
      if (parseInt(createdEvent.needed) - parseInt(createdEvent.participants) == 0) {
        return "no";
      }
      return createdEvent.needed - createdEvent.participants;
    }

    $scope.hasEventParticipants = function() {
      return $scope.eventParticipants.length != 0;
    }

    $scope.getPlurial = function() {
      return $scope.getSpaceLeft() > 1 ? "s": "";
    }

    $scope.displayEventParticipants = function(event_id) {
      $http({
        method: 'GET',
        url: '/profile/event_join_demands.json',
        params: {
          "event_id": event_id
        }
      }).then(function(response) {
        currentCreatedEventId = event_id;
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
        url: '/event_participants/' + currentCreatedEventId,
        params: {
          "user_id": user_id
        }
      }).then(function(response) {
        var participant = getParticipantsById(user_id);
        participant.confirmed = 'true';
        var createdEvent = getCreatedEventById(currentCreatedEventId);
        if(parseInt(createdEvent.needed) > parseInt(createdEvent.participants)) {
          createdEvent.participants = String(parseInt(createdEvent.participants) + 1);
        }
      },
      function(response) {
        // TODO: Error handling to do
        alert("Failed to retrieve joined events");
      });
    };

    $scope.removeParticipant = function (user_id) {
      $http({
        method: 'DELETE',
        url: '/event_participants/' + currentCreatedEventId,
        params: {
          "user_id": user_id
        }
      }).then(function(response) {
        var participantIndex = getParticipantsIndex(user_id);
        $scope.eventParticipants.splice(participantIndex, 1);
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

    $scope.profileData = "";

    // Profile data retrieval
    $scope.getProfileData = function () {
      $http({
        method: 'GET',
        url: '/profile/user_info.json'
      }).then(function(response) {
        $scope.profileData = response.data[0];
      },
      function(response) {
        // TODO: Error handling to do
        alert("Failed to retrieve profile data");
      });
    };

    // before linking phase
    // TODO only when connected as a user (do an if)
    $scope.getProfileData();
  }
]);
