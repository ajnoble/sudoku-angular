function CellService() {

    var cellService = {
        cellstatus : [],
        setupCellStatus : setupCellStatus,
        updateCellStatus : updateCellStatus
    };

    return cellService;
    /**
     * setupCellStatus method used for setting up the cell status 2D array that contains object for each cell
     * @param {object} sudokuBoardFromServer - json data from sudoku api
     * @returns {array}
     */
    function setupCellStatus(sudokuBoardFromServer) {
        cellService.cellstatus = [];
        for (var i = 0; i < sudokuBoardFromServer.length; i++) {
            cellService.cellstatus[i] = [];
            for (var j = 0; j < sudokuBoardFromServer[i].length; j++) {
                cellService.cellstatus[i][j] = {
                    disabled: false
                };
                if (sudokuBoardFromServer[i][j] !== 0) {
                    cellService.cellstatus[i][j].disabled = true;
                }
            }
        }
        return cellService.cellstatus;
    }

    /**
     * CellService.updateCellStatus method used for updating the cell staus once a move has been made
     * @param {number} row - cell row number
     * @param {number} col - cell col number
     * @param {string} alertType - alert box css class
     * @returns {array}
     */
    function updateCellStatus(row, col, alertType) {
        cellService.cellstatus[row][col].alertClass = alertType;
        return cellService.cellstatus;
    }

}
angular.module('Game').service('CellService', CellService);
