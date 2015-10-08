(function () {
  "use strict";
  angular.module("soccr").controller("PlayerFormCtrl", ["PlayersService", "$routeParams", "$location", function (PlayersService, $routeParams, $location) {
    var vm = this;

    vm.save = saveForm;

    vm.player = {};

    initialize();

    function initialize () {
      if ($routeParams.player_id) {
        PlayersService.get($routeParams.player_id).then(function (resp) {
          vm.player = resp.data;
        });
      }
    }

    function saveForm () {
      var method;

      if (angular.isDefined(vm.player.number)) {
        vm.player.number = parseInt(vm.player.number, 10);
      }

      method = $routeParams.player_id ? "update" : "create";
      PlayersService[method](vm.player).then(function (resp) {
        $location.path("/players/" + resp.data._id);
      });
    }
  }]);
}());
