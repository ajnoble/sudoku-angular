angular.module('Game', [
    'ui.router'
]).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('playing', {
            url: '/',
            templateUrl: './app/game/templates/playing.html',
            controller: 'GameCtrl',
            controllerAs: 'gameCtrl'
        })
        .state('solved', {
            url: '/solved',
            templateUrl: './app/game/templates/solved.html'
        });
    $urlRouterProvider.otherwise('/');
});
