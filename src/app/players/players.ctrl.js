(function () {
  "use strict";

  angular.module("soccr").controller("PlayersCtrl", ["PlayersService", function (PlayersService) {
    var vm = this;

    vm.players = [];
    vm.delete = deletePlayer;

    initialize();

    /////

    function initialize () {
      getPlayers();
    }

    function getPlayers () {
      PlayersService.get().then(function (resp) {
        vm.players = resp.data;
      });
    }

    function deletePlayer (player) {
      PlayersService.delete(player).then(function () {
        getPlayers();
      });
    }
  }]);
}());
