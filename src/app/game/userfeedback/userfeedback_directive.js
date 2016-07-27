angular.module('UserFeedbackDirective', [])
.directive('userfeedback', function(){
  return {
    restrict: "E",
    replace: true,
    templateUrl: "./app/game/userfeedback/userfeedback.tmpl.html"
  };
});
