import { WHITE, BLACK, startingPosition, pieceChars} from '../defs/defs.mjs';
const Board = {
    lastMove: [],
/* 
    A statement of the last move, used for verifying if en passant is a move 
    Most likely gonna be encoded as an array where:
   
    lastMove[0] is the starting square's coordinate
    lastMove[1] is the target square's coordinate
*/

    log: [],
    board: [],
    turn: 0,
    cRights: 0,
/* 
    Castling rights are encoded into a binary number with 4 digits:
    0b1111
    the bits signify, from left to right:
        - White's kingside castle
        - White's queenside castle
        - Black's kingside castle
        - Black's queenside castle

    eg. if cRights is 6 => 0110 white can castle queenside and black can castle kingside
*/

    init: () => {
        Board.board = [...startingPosition];
        Board.turn = WHITE;
        Board.cRights = 0b1111;
        Board.log = [];
    },

    printBoard: () => {

        console.log('\n    a b c d e f g h');
        console.log('    ---------------');
        for (let i = 70; i >= 0; i= i-10){
            let row = (Math.floor(i/10)+1) + ' | ';
            for (let j = 0; j < 8; j++){
                let piece = Board.board[i+j];
                let char = pieceChars[String(piece)];
                row = row + char + ' ';
            }
            row+= ' |';
            console.log(row);
        }   
    },
};

export default Board;