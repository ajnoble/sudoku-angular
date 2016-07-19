angular.module('GameboardDirective', [])
.directive('gameboard', function(){
  return {
    restrict: "E",
    replace: true,
    templateUrl: "./app/game/gameboard/gameboard.tmpl.html"
  };
});
