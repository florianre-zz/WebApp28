'use strict';

describe("feedModule Controllers,", function() {

    beforeEach(module('feedModule'));

    var element, mainScope, filterScope;

    beforeEach(inject(function ($controller, $rootScope, $compile) {
        mainScope = $rootScope.$new();
        $controller('feedPageController', {$scope: mainScope});
        filterScope = mainScope.$new();
        element = $compile('<div class="date" data-provide="datepicker"></div>')(filterScope);
        $controller('filterController', {
            $scope: filterScope,
            $element: element
        });
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
          filterScope.universitySelected({"title":"le"});
          expect(mainScope.filterUniversity).toBe("le");
          filterScope.universitySelected({"title":"bouffon"});
          expect(mainScope.filterUniversity).toBe("bouffon");
        });

        it("should not update the filterUniversity value if calling universitySelected with undefined parameter", function() {
          mainScope.filterUniversity = "value";
          filterScope.universitySelected(undefined);
          expect(mainScope.filterUniversity).toBe("value");
        });

      });

      it("should set filterDate to empty on broadcast of the clearDate event", function() {
        mainScope.filterDate = "value";
        var event = jQuery.Event('clearDate');
        element.trigger(event);
        // element.triggerHandler('clearDate');
        // mainScope.$digest();
        // mainScope.$broadcast('clearDate');
        expect(mainScope.filterDate).toBe("");
      });

});
