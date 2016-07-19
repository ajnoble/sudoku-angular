angular.module('Sudoku', [
    'Game',
    'ui.router',
    'GameboardDirective',
    'CellDirective',
    'UserFeedbackDirective'
]).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('playing', {
            url: '/',
            templateUrl: './app/game/templates/playing.html'
        })
        .state('solved', {
            url: '/solved',
            templateUrl: './app/game/templates/solved.html'
        });
    $urlRouterProvider.otherwise('/');
});
