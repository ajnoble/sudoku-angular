function GameModel($http){

  var URL = 'http://afternoon-mountain-94217.herokuapp.com/sudoku/';

  var gameModel = {
    getGameboard: function(){
      return  $http.get(URL);
    },
    putSudokuBoard: function(data){
      return $http.put(URL, data).then(
          function(result){
              return result;
          }
      );
    }
  };
  
  return gameModel;
}

angular.module('Game').service('GameModel', GameModel);
