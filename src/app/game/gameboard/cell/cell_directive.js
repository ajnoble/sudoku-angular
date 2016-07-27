angular.module('Game')
.directive('cell', function(){
  return {
    restrict: "E",
    replace: true,
    templateUrl: "./app/game/gameboard/cell/cell.tmpl.html",
    link: function(scope){
      scope.clearText = function($e){
        if($e){
          $e.target.select();
        }
      }
    }
  };
});
