function GameModel($http){
  //PRIVATE VARS
  var gameModel = this;
  var URL = 'http://afternoon-mountain-94217.herokuapp.com/sudoku/';

  //PUBLIC METHODS
  gameModel.getGameboard = getGameboard;
  gameModel.putSudokuBoard = putSudokuBoard;

  function getGameboard() {
    return  $http.get(URL);
  };

  function putSudokuBoard(data) {
      return $http.put(URL, data).then(
          function(result){
              return result;
          }
      );
  };
}

angular.module('Game').service('GameModel', GameModel);
