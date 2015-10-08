(function () {
  "use strict";

  var app = angular.module("soccr", ["ngRoute"]);

  app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when("/players", {
      templateUrl: "views/players/players_list.html",
      controller: "PlayersCtrl as vm",
    })
    .when("/players/new", {
      templateUrl: "views/player/player_form.html",
      controller: "PlayerFormCtrl as vm",
    })
    .when("/players/:player_id/edit", {
      templateUrl: "views/player/player_form.html",
      controller: "PlayerFormCtrl as vm",
    })
    .when("/players/:player_id", {
      templateUrl: "views/player/player_detail.html",
      controller: "PlayerCtrl as vm",
    })
    .otherwise({
      redirectTo: "/players",
    });
  }]);
}());
