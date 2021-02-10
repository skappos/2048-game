/*
Add your code for Game here
 */
export default class Game {
    constructor(integer) {
        this.integer = integer;
        this.dimensions = this.integer * this.integer
        this.board = new Array(this.dimensions).fill(0);
        this.score = 0;
        this.onMoveListener = [];
        this.onLoseListener = [];
        this.onWinListener = [];

        this.gameState = {
            board: this.board,
            score: this.score,
            won: false,
            over: false
        }

        this.addTile();
        this.addTile();
   
    }


    setupNewGame() {
        this.integer = this.integer
        this.dimensions = this.integer * this.integer
        this.board = new Array(this.dimensions).fill(0);
        this.score = 0;

        this.gameState = {
            board: this.board,
            score: this.score,
            won: false,
            over: false
        }

        this.addTile();
        this.addTile();

    }

    loadGame(gameState) {
        this.board = gameState.board,
        this.score = gameState.score,
        this.won = gameState.won,
        this.over = gameState.over
        this.gameState = gameState;

    }

    updateGameState() {
        this.gameState = {
            board: this.board,
            score: this.score,
            won: this.won,
            over: this.over
        }
    }

    move(direction) {

        switch(direction) {
            case "up" :
                this.upArrow();
                this.combineColumnUp();
                this.upArrow();
                break;
            case "down" :
                this.downArrow();
                this.combineColumnDown();
                this.downArrow();
                break;
            case "left" :
                this.leftArrow();
                this.combineRowLeft();
                this.leftArrow();
                break;
            case "right" :
                this.rightArrow()
                this.combineRowRight()
                this.rightArrow()
                break;
        }
        this.addTile();
        this.listenerFunctions(this.onMoveListener);
        this.checkOver();
        this.checkWon();
        this.updateGameState();
    
        
    }
    upArrow() {
        for (let i = 0; i < this.integer; i++) {
            let oldColumn = [this.board[i], this.board[i+ this.integer], this.board[i+this.integer + this.integer], this.board[i+this.integer+this.integer+this.integer]];
            let combineColumn = oldColumn.filter(tile => tile);
            let addBackZeros = new Array(this.integer - (combineColumn.length)).fill(0); 
            let newColumn = combineColumn.concat(addBackZeros); 
            // update board
            this.board[i] = newColumn[0];
            this.board[i+this.integer] = newColumn[1];
            this.board[i+this.integer+this.integer] = newColumn[2];
            this.board[i+this.integer+this.integer+this.integer] = newColumn[3]; 
        }
      

    }

    downArrow() {
        for (let i = 0; i < this.integer; i++) {
            let oldColumn = [this.board[i], this.board[i+ this.integer], this.board[i+this.integer + this.integer], this.board[i+this.integer+this.integer+this.integer]];
            let combineColumn = oldColumn.filter(tile => tile);
            let addBackZeros = new Array(this.integer - (combineColumn.length)).fill(0); 
            let newColumn = addBackZeros.concat(combineColumn); 
            // update board
            this.board[i] = newColumn[0];
            this.board[i+this.integer] = newColumn[1];
            this.board[i+this.integer+this.integer] = newColumn[2];
            this.board[i+this.integer+this.integer+this.integer] = newColumn[3]; 
        }
   
    }

    leftArrow() {
        for (let i = 0; i < this.dimensions; i ++) {
            if (i % 4 == 0) {
                let oldRow = [this.board[i], this.board[i+1], this.board[i+2], this.board[i+3]];
                let combineRow = oldRow.filter(tile => tile);
                let addBackZeros = new Array(this.integer - (combineRow.length)).fill(0);
                let newRow = combineRow.concat(addBackZeros);
                // update board
                this.board[i] = newRow[0];
                this.board[i+1] = newRow[1];
                this.board[i+2] = newRow[2];
                this.board[i+3] = newRow[3];
            }
        }
       
    }


    rightArrow() {
        for (let i = 0; i < this.dimensions; i ++) {
            if (i % 4 == 0) {
                let oldRow = [this.board[i], this.board[i+1], this.board[i+2], this.board[i+3]];
                let combineRow = oldRow.filter(tile => tile);
                let addBackZeros = new Array(this.integer - (combineRow.length)).fill(0);
                let newRow = addBackZeros.concat(combineRow);
                // update board
                this.board[i] = newRow[0];
                this.board[i+1] = newRow[1];
                this.board[i+2] = newRow[2];
                this.board[i+3] = newRow[3];
            }
        }
       
    }
    
    combineColumnUp() {
        let sum = 0;
        for (let i = 0; i < this.dimensions - this.integer; i++) {
            if(this.board[i] === this.board[i + this.integer]){
                sum = (this.board[i] + this.board[i + this.integer]);
                this.board[i] = sum
                this.score += sum;
                this.board[i + this.integer] = 0;
            }
        }
    }
    combineColumnDown() {
        let sum = 0;
        for (let i = this.dimensions - 1; i > 3; i--) {
            if(this.board[i] === this.board[i - this.integer]){
                sum = (this.board[i] + this.board[i - this.integer]);
                this.board[i] = sum
                this.score += sum;
                this.board[i - this.integer] = 0;
            }
        }
    }

    combineRowRight() {
        let sum = 0;
        for (let i = this.dimensions - 1; i > 0; i--) {
            if (i === 12 | i === 8 | i === 4) {
                i--;
            }
            if(this.board[i] === this.board[i-1]){
                sum = (this.board[i] + this.board[i-1]);
                this.board[i] = sum
                this.score += sum;
                this.board[i-1] = 0;
            }
        }
    }

    combineRowLeft() {
        let sum = 0;
        for (let i = 0; i < this.dimensions - 1; i++) {
            if (i === 3 | i === 7 | i === 11) {
                i++;
            }
            if(this.board[i] === this.board[i+1]){
                sum = (this.board[i] + this.board[i+1]);
                this.board[i] = sum
                this.score += sum;
                this.board[i+1] = 0;
            }
        }
    }

    listenerFunctions(listenerArray) {
        for (let i = 0; i < listenerArray.length; i++) {
            listenerArray[i](this.gameState)
        }
    }

    checkWon() {
        for (let i = 0; i < this.dimensions; i++) {
            if (this.board[i] === 2048) {
                this.won = true;
                this.listenerFunctions(this.onWinListener);
                return;
            }
        }
        this.won = false;
    }

    checkOver() {
        if(this.board.includes(0))  {
            this.over = false;
            return;
        }
        for (let i = 0; i < this.dimensions - this.integer; i++) {
            if(this.board[i] === this.board[i + this.integer]) {
                this.over = false;
                return;
            }
        }

        for (let j = this.dimensions -1; j > 3; j--) {
            if(this.board[j] === this.board[j - this.integer]) {
                this.over = false;
                return;
            }
        }

        for (let k = 0; k < this.dimensions - 1; k++) {
            if (k === 3 | k === 7 | k === 11) {
                k++;
            }
            if(this.board[k] === this.board[k+1]){
                this.over = false;
                return;
            }
        }

        for (let l = this.dimensions - 1; l > 0; l--) {
            if (l === 12 | l === 8 | l === 4) {
                l--;
            }
            if(this.board[l] === this.board[l-1]){
                this.over = false;
                return;
            }
        }
        this.over = true;
        this.listenerFunctions(this.onLoseListener);
        
    }


    tile2or4() {
        if (Math.random() >= .90) {
            return 4;
        }
        else {
            return 2;
        }
    }

    addTile() {
        if(!this.board.includes(0)){
            return;
        }
        var emptyTileIndexes = [];
        for (let i = 0; i < this.dimensions; i++) {
            if (this.board[i] == 0) {
                emptyTileIndexes.push(i);
            }
        }
        let randomSpot = emptyTileIndexes[Math.floor(Math.random() * emptyTileIndexes.length)];
        this.board[randomSpot] = this.tile2or4();
    }


    onMove(callback) {
        this.onMoveListener.push(callback);
    }

    onLose(callback) {
        this.onLoseListener.push(callback);
    }

    onWin(callback) {
        this.onWinListener.push(callback);
    }

    getGameState() {
        return this.gameState;
    }

}