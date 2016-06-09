'use strict'

var feedControllers = angular.module('feedControllers');

//TODO create service to put shared data
// Controller of the pop up to create a new event
feedControllers.controller('createEventController', ['$scope', '$http',
  function($scope, $http) {

    $scope.getFeedScope = function() {
         return $scope.$parent.getFeedScope();
    };
    $scope.$test = "";
        $scope.$tests = function() {
          return $scope;
        };
        $scope.$watch('test', function(newValue, oldValue) {
          console.log($scope.test);
        }, true);

      // Initialisation of all event characteristics
      $scope.event = {
        "sport": "",
        "date": "",
        "start_time": "",
        "end_time": "",
        "university_location": "",
        "location": "",
        "needed": 1,
        "additional_info": "",
        "level": "0",
        "phone": ""
      };
      $scope.selectedLevelString = "Any level";
      $scope.updateLevelValue = function () {
        var levelValue = 0;
        if($scope.selectedLevelString == "Any level") {
          levelValue = 0;
        } else if ($scope.selectedLevelString == "Beginner") {
          levelValue = 1;
        } else if ($scope.selectedLevelString == "Intermediate") {
          levelValue = 2;
        } else if ($scope.selectedLevelString == "Advanced") {
          levelValue = 3;
        }
        $scope.event.level = levelValue;
      }

      $scope.$watch('event', function(newValue, oldValue) {
        if(parseInt(newValue.needed) < 1) {
          $scope.event.needed = 1;
        }
        console.log($scope.event.date);
      }, true);

      // Creating a new event
      $scope.createEvent = function() {
        $http({
          method: 'POST',
          url: '/events.json',
          data: $scope.event
        }).then(function(response) {
          $scope.getFeedScope().getEvents();
        },
        function(response) {
          // TODO: Error handling to do
          alert("Failed to add events");
        });
      };

      $scope.creationSportUpdated = function (userInput) {
        if (userInput != undefined) {
          $scope.event.sport = userInput;
        }
      }

      $scope.creationSportSelected = function (selectedInfo) {
          if(selectedInfo != undefined) {
            $scope.event.sport = selectedInfo.title;
          }
      };

      $scope.creationLocationUpdated = function (userInput) {
        if (userInput != undefined) {
          $scope.event.university_location = userInput;
        }
      }

      $scope.creationLocationSelected = function (selectedInfo) {
          if(selectedInfo != undefined) {
            $scope.event.university_location = selectedInfo.title;
          }
      };

      $('#creationDatePicker').datepicker().on('clearDate', function(e) {
        $scope.$apply(function () {$scope.event.date = "";});
      });
      $('#creationDatePicker').datepicker().on('changeDate', function(e) {
        $scope.event.date = moment(e.date).format("dddd DD MMMM YYYY");
        if(!$scope.$$phase) {
          $scope.$apply();
        }
      });
      // Initialize date
      $("#creationDatePicker").datepicker("setDate", new Date());

      // Event when opened start time selaction
      $('#datetimepickerStart').on('dp.show', function(e) {
        // Close manually the dateTimePicker because it is not automatic (bug)
        $('#creationDatePicker').datepicker('hide');
      });

      // Event when opened start time selaction
      $('#datetimepickerEnd').on('dp.show', function(e) {
        // Close manually the dateTimePicker because it is not automatic (bug)
        $('#creationDatePicker').datepicker('hide');
      });

      // Update start time when change input start time
      $('#datetimepickerStart').on('dp.change', function(e) {
        $scope.event.start_time = e.date.format("HH:mm");
        $scope.$apply();
      });

      // Update end time when change input end time
      $('#datetimepickerEnd').on('dp.change', function(e) {
        $scope.event.end_time = e.date.format("HH:mm");
        $scope.$apply();
      });

      $scope.openEndTimePicker = function() {
        $('#datetimepickerEnd').data("DateTimePicker").toggle();
      }

      $scope.opeStartTimePicker = function() {
        $('#datetimepickerStart').data("DateTimePicker").toggle();
      }

      $scope.validTimeInputed = function () {
        return !moment($scope.event.end_time, 'HH:mm').isAfter(moment($scope.event.start_time, 'HH:mm'));
      }
 }]);
