import {WP, WN, WB, WQ, WK} from '../defs/defs.mjs';
import {pawnMoves, knightMoves, bishopMoves, queenMoves, kingMoves} from './movesByPiece.mjs';
import isLegal from './legalityCheck.mjs';

const allMoves = (board, cRights, turn) => {
    let moves = [];
    for (let sq=0; sq<board.length; sq++){
        if (sq%10!=8 && sq%10!=9 && board[sq]*turn>0){
            let piece = board[sq]*turn;
            switch(piece){
                case WP: 
                    moves = moves.concat(pawnMoves(sq, board));
                    break;
                case WN:
                    moves = moves.concat(knightMoves(sq, board));
                    break;
                case WB:
                    moves = moves.concat(bishopMoves(sq, board));
                    break;
                case WQ:
                    moves = moves.concat(queenMoves(sq, board));
                    break;
                case WK:
                    moves = moves.concat(kingMoves(sq, board, cRights));
            }
        }
    }
    let legalMoves = [];
    for (let move of moves){
        if (isLegal(move, board, turn)){
            legalMoves.push(move);
        };
    }
    console.log(legalMoves);
    return legalMoves;
}

export default allMoves;