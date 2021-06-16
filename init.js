/* 
            ///THE SOFTWARE SO FAR///

    

*/

import Board from './board/Board.mjs';
import allMoves from './moveGeneration/moveGenerator.mjs';
import makeMove from './moveGeneration/makeMove.mjs';


Board.init();
Board.printBoard();
console.log('Number of legal moves: ', allMoves(Board.board, Board.cRights, Board.turn).length);

setInterval( () => {
    let moves = allMoves(Board.board, Board.cRights, Board.turn);
    let move = moves[Math.floor(Math.random()*moves.length)];
    let sq1 = move[0];
    let sq2 = move[1];
    let prom = move[2];
    makeMove(sq1, sq2, prom);
    console.clear();
    Board.printBoard();
    Board.turn = -Board.turn;
}, 400);
    