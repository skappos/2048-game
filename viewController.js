import Game from "./engine/game.js"

let game = new Game(4);
//console.log(game.board[0])

function loadGameToGrid(game) {
    let cellNum = '#cell'
    for (let i = 0; i < 16; i++) {
        cellNum = '#cell' + i
        $(cellNum).text(game.board[i])
        $(cellNum).css('background-color', changeBackground(game.board[i]))
    }

}

$("body").css("overflow", "hidden");

function changeBackground(tileNumber) {
    if (tileNumber == 0) {
        return '#ccc0b3';
    }
    if (tileNumber == 2) {
        return '#eee4da';
    }
    if (tileNumber == 4) {
        return '#ede0c8';
    }
    if (tileNumber == 8) {
        return '#f2b179';
    }
    if (tileNumber == 16) {
        return '#f59563';
    }
    if (tileNumber == 32) {
        return '#f67c5f';
    }
    if (tileNumber == 64) {
        return '#f65e3b';
    }
    if (tileNumber == 128) {
        return '#edcf72';
    }
    if (tileNumber == 256) {
        return '#edcc61';
    }
    if (tileNumber == 512) {
        return '#edc850';
    }
    if (tileNumber == 1024) {
        return '#edc53f';
    }
    if (tileNumber == 2048) {
        return '#edc22e';
    }

   
}


function newGame() {
    game.setupNewGame();
    loadGameToGrid(game);
    loadScore(game);
    $('win').text('');
    $('lose').text('');
}

$('#new-game').click(newGame);

function loadScore(game) {
    $('#score').text("Score: " + game.score);
}

function wonOrOver(game) {
    if (game.won === true) {
        $('#win').text("You Won!")
    }
    if (game.over === true) {
        $('#lose').text("Game Over! Your Score was: " + game.score)
    }
}

$(document).keydown(function(event) {
    if (event.keyCode == 37) {
        game.move('left')
    }
    if (event.keyCode == 38) {
        game.move('up')
    }
    if (event.keyCode == 39) {
        game.move('right')
    }
    if (event.keyCode == 40) {
        game.move('down')
    } 
    loadGameToGrid(game);
    loadScore(game);
    wonOrOver(game);

});

loadGameToGrid(game);
