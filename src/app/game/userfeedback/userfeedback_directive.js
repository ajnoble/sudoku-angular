angular.module('Game')
.directive('userFeedback', function(){
  return {
    restrict: "E",
    replace: true,
    templateUrl: "./app/game/userFeedback/userFeedback.tmpl.html"
  };
});
