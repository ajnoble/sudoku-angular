function GameCtrl(GameModel, UserFeedbackService, $state){
  //PRIVATE VARS
  var gameCtrl = this;
  var cachedBoard = [];
  var alert = {
    danger : 'alert-danger',
    success : 'alert-success',
    info  : 'alert-info'
  };

  //PUBLIC VARS
  gameCtrl.loaded = false;
  gameCtrl.sudokuboard = [];
  gameCtrl.cellstatus = [];
  gameCtrl.userFeedback = UserFeedbackService;

  //PUBLIC METHODS
  gameCtrl.makeMove = makeMove;

  //INITIALIZE GAME
  newGame();

  //GameCtrl METHODS

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
    gameCtrl.sudokuboard = noZerosBoard
    //cache the board for later use
    cacheBoard();
    return noZerosBoard;

  }

  /**
  * cacheBoard method used for storing original state of the board after a user has inputed new values
  * @returns {array} - board array
  */
  function cacheBoard(){
    cachedBoard = angular.copy(gameCtrl.sudokuboard);
    return cachedBoard;
  }

  /**
  * setupCellStatus method used for setting up the cell status 2D array that contains object for each cell
  * @param {object} result - json data from sudoku api
  * @returns {array}
  */
  function setupCellStatus(result){
    var data = result;
    gameCtrl.cellstatus = [];
    for(var i = 0; i<data.length; i++){
      gameCtrl.cellstatus[i] = [];
      for(var j = 0; j<data[i].length; j++){
        gameCtrl.cellstatus[i][j] = {
          disabled: false
        };
        if(data[i][j] !== 0){
          gameCtrl.cellstatus[i][j].disabled = true;
        }
      }
    }
    return gameCtrl.cellstatus;
  }

  /**
  * newGame method used for initialzing a new game
  * @returns {void}
  */
  function newGame(){
    UserFeedbackService.updateUserFeedback('Loading Board...', alert.info)
    //get gameboard
    GameModel.getGameboard()
      .then(function(result){
        if(result.status !== 200){
          UserFeedbackService.updateUserFeedback('Something\'s wrong...'+result.status, alert.danger)
          return;
        }
        setupCellStatus(result.data.sudokuBoard);
        removeZerosFromBoard(result.data.sudokuBoard);
        UserFeedbackService.updateUserFeedback('', '')
      });
  }

  /**
  * updateCellStatus method used for updating the cell staus once a move has been made
  * @param {number} row - cell row number
  * @param {number} col - cell col number
  * @param {string} alertType - alert box css class
  * @returns {array}
  */
  function updateCellStatus(row, col, alertType){
    gameCtrl.cellstatus[row][col].alertClass = alertType;
    return gameCtrl.cellstatus;
  }

  /**
  * updateCellStatus method used for updating the cached game board
  * @param {number} row - cell row number
  * @param {number} col - cell col number
  * @param {number} val - new cell value
  * @returns {array}
  */
  function updateCachedBoard(row, col, val){
    cachedBoard[row][col] = val;
    return cachedBoard;
  }

  /**
  * prepJsonObject method used for formatting the json object prior to put request
  * @param {number} moveRow - cell row number
  * @param {number} moveColumn - cell col number
  * @param {number} moveValue - cell value
  * @returns {object}
  */
  function prepJsonObject(moveRow, moveColumn, moveValue){
    var data = {
      sudokuBoard : cachedBoard,
      moveRow : moveRow,
      moveColumn : moveColumn,
      moveValue : moveValue
    }
    return data;
  }

  /**
  * makeMove method used for validating move, prepping data, and putting data
  * @param {number} row - cell row number
  * @param {number} col - cell col number
  * @returns {void}
  */
  function makeMove(row, col) {
    var val = gameCtrl.sudokuboard[row][col];
    //is the move valid
    if(val === ''){
      return;
    }
    if(val === null || val > 10 || val < 0){
      UserFeedbackService.updateUserFeedback('Only numbers please!', alert.danger);
      updateCellStatus(row, col, alert.danger);
      return;
    }

    //Move is valid lets prep the data
    var data = prepJsonObject(row, col, val);

    //let the user know we are checking the move
    UserFeedbackService.updateUserFeedback('Checking move...', alert.info);

    //put the data
    GameModel.putSudokuBoard(data).then(function(result){
      //SUCCESS
      //game over?
      if(result.data.gameOver === true){
        $state.go('solved');
      }
      //move was good
      updateCellStatus(row, col, alert.success);
      updateCachedBoard(row, col, val);
      UserFeedbackService.updateUserFeedback('Good move ;)', alert.success);
    }, function(result){
      //api didnt return a 409 so something must be wrong
      if(result.status !== 409){
        UserFeedbackService.updateUserFeedback('Something\'s wrong...'+result.status, alert.danger)
        return;
      }
      //move returned a conflict
      updateCellStatus(row, col, alert.danger);
      updateCachedBoard(row, col, val);
      UserFeedbackService.updateUserFeedback(result.statusText+'! Check out row: '+(result.data.conflictRow+1)+' and coloumn: '+(result.data.conflictColumn+1), alert.danger);
    });
  }
}

angular.module('Game').controller('GameCtrl', GameCtrl);
