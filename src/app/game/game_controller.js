function GameCtrl(GameModel, UserFeedbackService, GameboardService, CellService, $state){
  //PRIVATE VARS
  var gameCtrl = this;
  var alert = {
    danger : 'alert-danger',
    success : 'alert-success',
    info  : 'alert-info'
  };

  //PUBLIC VARS
  gameCtrl.loaded = false;
  gameCtrl.sudokuboard = GameboardService.sudokuboard;
  gameCtrl.cellstatus = CellService;
  gameCtrl.userFeedback = UserFeedbackService;

  //PUBLIC METHODS
  gameCtrl.makeMove = makeMove;

  //INITIALIZE GAME
  newGame();

  //GameCtrl METHODS

  /**
  * newGame method used for initialzing a new game
  * @returns {void}
  */
  function newGame(){
    //get gameboard
    GameModel.getGameboard()
      .then(function(result){
        if(result.status !== 200){
          UserFeedbackService.updateUserFeedback('Something\'s wrong...'+result.status, alert.danger)
          return;
        }
        gameCtrl.cellstatus = CellService.setupCellStatus(result.data.sudokuBoard);
        gameCtrl.sudokuboard = GameboardService.removeZerosFromBoard(result.data.sudokuBoard);
        UserFeedbackService.updateUserFeedback('', '');

      });
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
      sudokuBoard : GameboardService.cachedBoard,
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
    //is there a value? if not upadte the cell status and return
    if(val === '' || val === null){
      gameCtrl.cellstatus = CellService.updateCellStatus(row, col, '');
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
      gameCtrl.cellstatus = CellService.updateCellStatus(row, col, alert.success);
      GameboardService.updateCachedBoard(row, col, val);
      UserFeedbackService.updateUserFeedback('Good move ;)', alert.success);
    }, function(result){
      //api didnt return a 409 so something must be wrong
      if(result.status !== 409){
        UserFeedbackService.updateUserFeedback('Something\'s wrong...'+result.status, alert.danger);
        gameCtrl.cellstatus = CellService.updateCellStatus(row, col, alert.danger);
        return;
      }
      //move returned a conflict
      gameCtrl.cellstatus = CellService.updateCellStatus(row, col, alert.danger);
      GameboardService.updateCachedBoard(row, col, val);
      UserFeedbackService.updateUserFeedback(result.statusText+'! Check out row: '+(result.data.conflictRow+1)+' and coloumn: '+(result.data.conflictColumn+1), alert.danger);
    });
  }
}

angular.module('Game').controller('GameCtrl', GameCtrl);
