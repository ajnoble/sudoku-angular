angular.module('Game', ['CellDirective'])
.directive('gameboard', function(){
  return {
    restrict: "E",
    replace: true,
    templateUrl: "./app/game/gameboard/gameboard.tmpl.html"
  };
});
