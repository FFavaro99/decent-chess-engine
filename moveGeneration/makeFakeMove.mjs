import {WP, BP, WR, BR, WK, BK, E} from '../defs/defs.mjs';


const makeFakeMove = (board, sq1, sq2, promTo) => {
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
    //Make normal move
    else {
        board[sq2] = movingPiece;
    }
    return board;
}

export default makeFakeMove;