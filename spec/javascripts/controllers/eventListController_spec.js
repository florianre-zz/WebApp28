'use strict';
describe("Testing Jasmine", function() {

  beforeEach(module('feedModule'));
  var scope, eventListController;

  beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        eventListController = $controller('eventListController', {
            $scope: scope
        });
    }));

  describe("correctly interact with database,", function() {
      var $httpBackend;
      beforeEach(inject(function (_$httpBackend_) {
        $httpBackend = _$httpBackend_;
      }));

      afterEach (function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it("should post to database when joinEvent is called", function() {
        $httpBackend.expectPOST('/event_participants.json').respond();
        scope.joinEvent();
        $httpBackend.flush();
      });

    });
});
