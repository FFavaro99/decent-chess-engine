
import { E } from '../defs/defs.mjs';
import {WK, BK, WR, BR} from '../defs/defs.mjs';


const [UP, DOWN, LEFT, RIGHT] = [10, -10, -1, 1];


const pawnMoves = (sq, board) => {     //Currently missing en passant
    let moves = [];
    let up = board[sq] * UP;
    if ( (sq + up <= 77 && sq + up >= 0) && board[sq+up] === E){    //IF PAWN CAN MOVE UP
        if (  ( (up > 0 && Math.floor(sq/10) === 1) || (up < 0 && Math.floor(sq/10)=== 6) ) && board[sq+up+up] === E ){ //IF PAWN CAN MOVE UP BY 2
                moves.push([sq, sq+up+up]);
            }
        if (Math.floor((sq+up)/10) === 7){    //IF PAWN IS MOVING UP TO THE LAST RANK
            for (let i = 2; i<6; i++){
                console.log('can promote to', i);
                moves.push([sq, sq+up, i]);
            }
        }
        else if (Math.floor((sq+up)/10) === 0){   //IF PAWN IS MOVING UP TO THE LAST RANK
            for (let i = 2; i<6; i++){
                console.log('can promote to', i);
                moves.push([sq, sq+up, -i]);
            }
        }
        else {
            moves.push([sq, sq+up]);
        }
    }
    if ((sq + up + RIGHT <= 77 && sq + up + RIGHT >= 0 && ((sq + up + RIGHT)%10 !== 8))){   //IF PAWN CAN EAT DIAGONALLY TO RIGHT
        if (board[sq+up+RIGHT]*board[sq] < 0){
            if (Math.floor((sq+up+RIGHT)/10) === 7){  //IF PAWN IS MOVING UP TO THE LAST RANK
                for (let i = 2; i<6; i++){
                    console.log('can promote to', i);
                    moves.push([sq, sq+up+RIGHT, i]);
                }
            }
            else if (Math.floor((sq+up+RIGHT)/10) === 0){     //IF PAWN IS MOVING UP TO THE LAST RANK
                for (let i = 2; i<6; i++){
                    console.log('can promote to', i);
                    moves.push([sq, sq+up+RIGHT, -i]);
                }
            }
            else {
                moves.push([sq, sq+up+RIGHT]);      //NO PROMOTION
            }
        }
    }
    if ((sq + up + LEFT <= 77 && sq + up + LEFT >= 0 && ((sq + up + LEFT)%10 !== 8))){  //IF PAWN CAN EAT DIAGONALLY TO LEFT
        if (board[sq+up+LEFT]*board[sq] < 0){
            if (Math.floor((sq+up+LEFT)/10) === 7){   //IF PAWN IS MOVING UP TO THE LAST RANK
                for (let i = 2; i<6; i++){
                    console.log('can promote to', i);
                    moves.push([sq, sq+up+LEFT, i]);
                }
            }
            else if (Math.floor((sq+up+LEFT)/10) === 0){      //IF PAWN IS MOVING UP TO THE LAST RANK
                for (let i = 2; i<6; i++){
                    console.log('can promote to', i);
                    moves.push([sq, sq+up+LEFT, -i]);
                }
            }
            else {
                moves.push([sq, sq+up+RIGHT]);      //NO PROMOTION
            }
        }
    }
    return moves;
}

const knightMoves = (sq, board) => {
    let moves = [];
    let targets = [sq+UP+UP+LEFT, sq+UP+UP+RIGHT, sq+UP+RIGHT+RIGHT, sq+UP+LEFT+LEFT, sq+DOWN+DOWN+LEFT, sq+DOWN+DOWN+RIGHT, sq+DOWN+RIGHT+RIGHT, sq+DOWN+LEFT+LEFT];
    for (let target of targets){
        if ( target <= 77 && target >= 0 && target%10 != 8 && target%10 != 9 && board[target]*board[sq] <= 0) {
            moves.push([sq, target]);
        }
    }
    return moves;
}

const bishopMoves = (sq, board) => {
    let moves = [];
    let directions = [UP + RIGHT, UP + LEFT, DOWN + RIGHT, DOWN + LEFT];
    for (let direction of directions){
        let target = sq + direction;
        let obstructed = false;
        while (target <= 77 && target >= 0 && !obstructed && target%10 != 8 && target%10 != 9){
            if (board[target] === 0){
                moves.push([sq, target]);
                target += direction;
            }
            else if (board[target]*board[sq] < 0){
                moves.push([sq, target]);
                obstructed = true;
            }
            else if (board[target]*board[sq] > 0){
                obstructed = true;
            }
        }
    }
    return moves;
}

const rookMoves = (sq, board) => {
    let moves = [];
    let directions = [UP , DOWN , LEFT, RIGHT];
    for (let direction of directions){
        let target = sq + direction;
        let obstructed = false;
        while (target <= 77 && target >= 0 && !obstructed && target%10 != 8 && target%10 != 9){
            if (board[target] === 0){
                moves.push([sq, target]);
                target += direction;
            }
            else if (board[target]*board[sq] < 0){
                moves.push([sq, target]);
                obstructed = true;
            }
            else if (board[target]*board[sq] > 0){
                obstructed = true;
            }
        }
    }
    return moves;
}

const queenMoves = (sq, board) => {
    return (bishopMoves(sq, board).concat(rookMoves(sq, board)));
}

const kingMoves = (sq, board, cRights) => {
    let moves = [];
    let directions = [UP, DOWN, LEFT, RIGHT, UP+RIGHT, UP+LEFT, DOWN+RIGHT, DOWN+LEFT];
    for (let direction of directions){
        let target = sq + direction;
        if (target <= 77 && target >= 0 && target%10 != 8 && target%10 != 9 && board[target]*board[sq] <= 0){
            moves.push([sq, target]);
        }
    }
    //white castling
    if (board[sq] === WK && sq === 4){
        if (board[0] === WR && board[1] === E && board[2] === E && board[3] === E){
            if (cRights & 0b0010 === 2){
                moves.push([sq, sq-2]);
            }
        }
        if (board[7] === WR && board[6] === E && board[5] === E ){
            if (cRights & 0b0001 === 1){
                moves.push([sq, sq+2]);
            }
        }
    }
    //Black castling
    if (board[sq] === BK && sq === 74){
        if (board[70] === BR && board[71] === E && board[72] === E && board[73] === E){
            if (cRights & 0b1000 === 8){
                moves.push([sq, sq-2]);
            }
        }
        if (board[70] === BR && board[76] === E && board[75] === E ){
            if (cRights & 0b0100 === 4){
                moves.push([sq, sq+2]);
            }
        }
    }
    return moves;
}


export {pawnMoves, knightMoves, bishopMoves, rookMoves, queenMoves, kingMoves};