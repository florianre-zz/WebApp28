'use strict';

describe("feedModule Controllers,", function() {

    beforeEach(module('feedModule'));

    var mainScope, filterScope;

    beforeEach(inject(function ($controller, $rootScope) {
        mainScope = $rootScope.$new();
        $controller('feedPageController', {$scope: mainScope});
        filterScope = mainScope.$new();
        $controller('filterController', {$scope: filterScope});
      }));

      describe("correct initialisation,", function() {

        //TODO implement this test when sport retrieval done
        // it("should initialise sport of university by requesting sports from the database", function() {
        //   expect(scope.filterUniversity).toBe("");
        // });

      });

      describe("correctly managed university input,", function() {

          it("should update the filterUniversity value if calling inputUniversityUpdated with empty string", function() {
            mainScope.filterUniversity = "value";
            filterScope.inputUniversityUpdated("");
            expect(mainScope.filterUniversity).toBe("");
            filterScope.inputUniversityUpdated("");
            expect(mainScope.filterUniversity).toBe("");
          });

        it("should not update the filterUniversity value if calling inputUniversityUpdated with non empty string", function() {
          mainScope.filterUniversity = "value";
          filterScope.inputUniversityUpdated("Imperial");
          expect(mainScope.filterUniversity).toBe("value");
          filterScope.inputUniversityUpdated("UCL");
          expect(mainScope.filterUniversity).toBe("value");
          filterScope.inputUniversityUpdated("Corentin");
          expect(mainScope.filterUniversity).toBe("value");
          filterScope.inputUniversityUpdated("Test");
          expect(mainScope.filterUniversity).toBe("value");
        });

        it("should update the filterUniversity value if calling universitySelected with defined parameter", function() {
          mainScope.filterUniversity = "value";
          filterScope.universitySelected({"title":"paul"});
          expect(mainScope.filterUniversity).toBe("paul");
          filterScope.universitySelected({"title":"test"});
          expect(mainScope.filterUniversity).toBe("test");
          filterScope.universitySelected({"title":"new"});
          expect(mainScope.filterUniversity).toBe("new");
        });

        it("should not update the filterUniversity value if calling universitySelected with undefined parameter", function() {
          mainScope.filterUniversity = "value";
          filterScope.universitySelected(undefined);
          expect(mainScope.filterUniversity).toBe("value");
        });

      });

});
