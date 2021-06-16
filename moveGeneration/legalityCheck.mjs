
import makeFakeMove from './makeFakeMove.mjs';

//STILL HAVEN'T CHECKED FOR BUGS//


const isSquareAttacked = (board, sq, turn) => {
    //CHECKING FOR PAWNS
    // console.log('checking if attacked by pawn');
    if (turn > 0){         //if it's a white piece
        let position = sq+9;
        if (position <= 77 && position%10 != 8 && position%10 != 9 && board[position] === -1){      //check left diagonal for pawn
            return true;
        }
        position = sq+11;
        if (position <= 77 && position%10 != 8 && position%10 != 9 && board[position] === -1){     //check right diagonal for pawn
            return true;
        }
    }
    else {         //if it's a white piece
        let position = sq-9;
        if (position >= 0 && position%10 != 8 && position%10 != 9 &&  board[position] === 1){      //check left diagonal for pawn
            return true;
        }
        position = sq-11;
        if (position >= 0 && position%10 != 8 && position%10 != 9 && board[position] === 1){     //check right diagonal for pawn
            return true;
        }
    }
    //CHECKING FOR KNIGHTS
    let knights = [sq+21, sq+12, sq+19, sq+8, sq-12, sq-21, sq-19, sq-8];
    // console.log('Checking if attacked by knight');
    for (let position of knights){              //check if attacked by knights
        if (position <= 77 && position >= 0 && position%10 != 8 && position%10 != 9){
            if (turn*board[position] === -2){
                return true;
            }
        }
    }
    let directions = [11, -11, 9, -9];    //check if attacked by bishop/queen
    // console.log("checking if attacked by bishop");
    for (let direction of directions){
        // console.log(direction);//
        let obstructed = false;
        let target = sq + direction;
        while (!obstructed && target <= 77 && target >= 0 && target%10 != 8 && target%10 != 9){
            let piece = board[target];
            // console.log('Verifying piece', piece);
            if (piece*turn > 0) {
                obstructed = true;
                // console.log(obstructed);
            }
            else if (Math.abs(piece) === 3 || Math.abs(piece) === 5){
                return true;
            }
            target+= direction;
        }
    }
    directions = [10, -10, 1, -1];              //check if attacked by rook/queen
    // console.log("checking if attacked by rook");
    for (let direction of directions){
        let obstructed = false;
        let target = sq + direction;
        while (!obstructed && target <= 77 && target >= 0 && target%10 != 8 && target%10 != 9){
            let piece = board[target];
            if (piece*turn > 0) {
                obstructed = true;
            }
            else if (Math.abs(piece) === 4 || Math.abs(piece) === 5){
                return true;
            }
            target+= direction;
        }
    }

    //CHECK FOR NEARBY KING
    // console.log("checking if attacked by king");
    directions = [9, 10, 11, -1, 1, -9, -10, -11];
    for (let direction of directions){
        let target = direction + sq;
        if (target <= 77 && target >= 0 && target%10 != 8 && target%10 != 9){
            let piece = board[target];
            if (piece*turn < 0 && Math.abs(piece) === 6){
                return true;
            }
        }
    }
    return false;
}


/* 
For every move, 

- if it is a castling move, call isSquareAttacked on king, destination, in-between square
- if it is not a castling move, find the king in the position and call isSquareAttacked on the king

*/
const isLegal = (move, board, turn) => {
    // console.log(move);        
    let sq1 = move[0];
    let sq2 = move[1];
    let prom = move[2];
    let boardCopy = [...board];
    boardCopy = makeFakeMove(boardCopy, sq1, sq2, prom);
    // console.log(boardCopy);

    if (boardCopy[sq1]*turn === 6){
        if (sq2 - sq1 === 2 || sq1 - sq2 === 2){
            let end = Math.max(sq1, sq2);
            let start = Math.min(sq1, sq2);
            for (let inBetween = start; inBetween <= end; inBetween++){
                if (isSquareAttacked(board, inBetween, turn)){
                    return false;
                }
            }
        }
    }
    else {
        for (let i = 0; i <= 77; i++){
            if (boardCopy[i]*turn === 6){
                return !isSquareAttacked(boardCopy, i, turn);
            }
        }
    }
    return true;
}

export default isLegal;