function GameModel($http, GameboardService){

  var URL = 'http://afternoon-mountain-94217.herokuapp.com/sudoku/';

  var gameModel = {
    getGameboard: function(){
      return  $http.get(URL);
    },
    putSudokuBoard: function(row, col, val){
      var sanitisedData = prepJsonObject(row, col, val);
      return $http.put(URL, sanitisedData)
    }
  };

  return gameModel;

  /**
  * prepJsonObject method used for formatting the json object prior to put request
  * @param {number} moveRow - cell row number
  * @param {number} moveColumn - cell col number
  * @param {number} moveValue - cell value
  * @returns {object}
  */
  function prepJsonObject(moveRow, moveColumn, moveValue){
    var data = {
      sudokuBoard : GameboardService.cachedBoard,
      moveRow : moveRow,
      moveColumn : moveColumn,
      moveValue : moveValue
    }
    return data;
  }
}

angular.module('Game').service('GameModel', GameModel);
