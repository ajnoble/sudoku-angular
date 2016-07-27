function GameboardService(){

  var gameboardService = {
        sudokuboard : [],
        cachedBoard : [],
        removeZerosFromBoard : removeZerosFromBoard,
        updateCachedBoard : updateCachedBoard
    };

    return gameboardService;

    /**
    * removeZerosFromBoard method used for removing 0's from the initial sudoku board
    * @param {object} result - json data from sudoku api
    * @returns {array} - board array with 0's removed
    */
    function removeZerosFromBoard(result){
      var noZerosBoard = result;
      for(var i = 0; i<noZerosBoard.length; i++){
        for(var j = 0; j<noZerosBoard[i].length; j++){
          noZerosBoard[i][j] = (noZerosBoard[i][j] === 0) ? '' : noZerosBoard[i][j];
        }
      }
      gameboardService.sudokuboard = noZerosBoard;
      //cache the board for later use
      cacheBoard();
      return noZerosBoard;
    }

    /**
    * cacheBoard method used for storing original state of the board after a user has inputed new values
    * @returns {array} - board array
    */
    function cacheBoard(){
      gameboardService.cachedBoard = angular.copy(gameboardService.sudokuboard);
      return gameboardService.cachedBoard;
    }
    function updateCachedBoard(row, col, val){
      gameboardService.cachedBoard[row][col] = val;
      return gameboardService.cachedBoard;
    }

}
angular.module('Game').service('GameboardService', GameboardService);
