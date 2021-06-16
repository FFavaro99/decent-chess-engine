import {WP, BP, WK, BK, WR, BR, E} from '../defs/defs.mjs';
import Board from '../board/Board.mjs'


//Coordinates here as passed as integer values, which are the array indexes.
//A1 would correspond to 0,0, so the passed index here would be 0
//B1 would be 0,1, so here the index would be 1     (0*10 + 1)
//D5 would be 4, 3, so here the index would be 43   (4*10 + 3)

const makeMove = (sq1, sq2, promTo) => {
    console.log('selected move is: ', sq1, 'to', sq2);
    console.log('board before move: ', Board.board);
    let board = Board.board;
    let movingPiece = board[sq1];
    board[sq1] = E;
    if ( (movingPiece === WP && Math.floor(sq1/10) === 6) ||
         (movingPiece === BP && Math.floor(sq1/10) === 1) ) {   //Promotion
        board[sq2] = promTo;
    }
    else if (movingPiece === WK && sq2 - sq1 === 2){    //White kingside castle
        board[7] = E;
        board[sq2] = movingPiece;
        board[5] = WR;
    }
    else if (movingPiece === WK && sq1 - sq2 === 2){    //White queenside castle
        board[0] = E;
        board[sq2] = movingPiece;
        board[3] = WR;
    }
    else if (movingPiece === BK && sq2 - sq1 ===2){     //Black kingside castle
        board[77] = E;
        board[sq2] = movingPiece;
        board[75] = BR;
    }
    else if (movingPiece === BK && sq1 - sq2 ===2){     //Black queenside castle
        board[70] = E;
        board[sq2] = movingPiece;
        board[73] = BR;
    }
    //UPDATE POSITION
    else {
        board[sq2] = movingPiece;
    }

    //UPDATE CASTLING RIGHTS
    if (movingPiece === WK){
        Board.cRights = Board.cRights & 0b1100;
    }
    else if (movingPiece === BK){
        Board.cRights = Board.cRights & 0b0011;
    }
    else if (movingPiece === WR && sq === 0){
        Board.cRights = Board.cRights & 0b1101;
    }
    else if (movingPiece === WR && sq === 7){
        Board.cRights = Board.cRights & 0b1110;
    }
    else if (movingPiece === BR && sq === 70){
        Board.cRights = Board.cRights & 0b0111;
    }
    else if (movingPiece === BR && sq === 77){
        Board.cRights = Board.cRights & 0b1011;
    }
    console.log('board after move: ', Board.board);
}

export default makeMove;