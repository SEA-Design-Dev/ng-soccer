(function () {
  "use strict";

  var app = angular.module("soccr", ["ngRoute"]);

  app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when("/players", {
      templateUrl: "partials/players/players_list.html",
      controller: "PlayersCtrl as vm",
    })
    .when("/players/new", {
      templateUrl: "partials/players/player_form.html",
      controller: "PlayerFormCtrl as vm",
    })
    .when("/players/:player_id/edit", {
      templateUrl: "partials/players/player_form.html",
      controller: "PlayerFormCtrl as vm",
    })
    .when("/players/:player_id", {
      templateUrl: "partials/players/player_detail.html",
      controller: "PlayerCtrl as vm",
    })
    .otherwise({
      redirectTo: "/players",
    });
  }]);
}());
