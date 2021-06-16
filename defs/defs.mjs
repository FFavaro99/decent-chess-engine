const [WP, WN, WB, WR, WQ, WK, BP, BN, BB, BR, BQ, BK, E, OUT] = [1, 2, 3, 4, 5, 6, -1, -2, -3, -4, -5, -6, 0, 8];

const pieceChars = {
    "1": "P",
    "2": "N",
    "3": "B",
    "4": "R",
    "5": "Q",
    "6": "K",
    "-1": "p",
    "-2": "n",
    "-3": "b",
    "-4": "r",
    "-5": "q",
    "-6": "k",
    "0": ".",
}

const [WHITE, BLACK] = [1, -1];

const startingPosition = [
    WR, WN, WB, WQ, WK, WB, WN, WR, OUT, OUT,
    WP, WP, WP, WP, WP, WP, WP, WP, OUT, OUT,
    E,  E,  E,  E,  E,  E,  E,  E,  OUT, OUT,
    E,  E,  E,  E,  E,  E,  E,  E,  OUT, OUT,
    E,  E,  E,  E,  E,  E,  E,  E,  OUT, OUT,
    E,  E,  E,  E,  E,  E,  E,  E,  OUT, OUT,
    BP, BP, BP, BP, BP, BP, BP, BP, OUT, OUT,
    BR, BN, BB, BQ, BK, BB, BN, BR
];

export {WP, WN, WB, WR, WQ, WK, BP, BN, BB, BR, BQ, BK, E, OUT, WHITE, BLACK, startingPosition, pieceChars};
