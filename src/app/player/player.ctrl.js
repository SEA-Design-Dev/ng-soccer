angular.module("soccr").controller("PlayerCtrl", ["PlayersService", "$routeParams", function (PlayersService, $routeParams) {
  var vm = this;

  initialize();

  function initialize() {
    PlayersService
      .get($routeParams.player_id)
      .then(function (resp) {
        vm.player = resp.data;
      });
  }
}]);
