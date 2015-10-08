require("../app.js");

(function() {
  "use strict";

  angular.module("soccr")
  .directive("playerDetails", function () {
    return {
      scope: {
        player: "=player", // functionally the same as ng-model
      },
      templateUrl: "views/player/player_details_directive.html",
    };
  });
}());
