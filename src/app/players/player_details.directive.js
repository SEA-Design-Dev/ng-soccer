(function() {
  "use strict";

  angular.module("soccr").directive("playerDetails", function () {
    return {
      scope: {
        ngModel: "=", // ng-model
      },
      template: "<dl><dt>Position</dt><dd>{{vm.player.position}}</dd><dt>Jersey Number</dt><dd>{{vm.player.number}}</dd></dl>",
    };
  });
}());
