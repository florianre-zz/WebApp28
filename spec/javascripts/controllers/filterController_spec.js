'use strict';

describe("feedModule Controllers", function() {

    beforeEach(module('feedModule'));

    var scope, filterController;

    beforeEach(inject(function ($controller, $rootScope) {
          scope = $rootScope.$new();
          filterController = $controller('filterController', {
              $scope: scope
          });
      }));

      describe("correct initialisation", function() {

        //TODO implement this test
        // it("should initialise sport of university by requesting sports from the database", function() {
        //   expect(scope.filterUniversity).toBe("");
        // });

      });

      describe("correctly managed university input", function() {

        //TODO check that initialy empty currentUniversityInputValue

        it("should call to inputUniversityUpdated should update the currentUniversityInputValue variable", function() {
          scope.inputUniversityUpdated("")
          expect(filterController.currentUniversityInputValue).toBe("");
        });

      });

});
