import { game } from "./game.js";
import { getSlidingMoves } from "./rays.js";


// ==========================================
// Регистрация генераторов ходов
// ==========================================

const moveGenerators = {

    pawn: getPawnMoves,

    rook: getRookMoves,

    knight: getKnightMoves,

    bishop: getBishopMoves,

    queen: getQueenMoves,

    king: getKingMoves

};

// ==========================================
// Главная функция
// ==========================================

export function getLegalMoves(piece, row, col) {

    const generator = moveGenerators[piece.type];

    if (!generator) {

        return [];

    }

    return generator(piece, row, col);

}

export function getAttackMoves(piece, row, col) {

    if (piece.type === "pawn") {

        return getPawnAttackMoves(piece, row, col);

    }

    return getLegalMoves(piece, row, col);

}

// ==========================================
// Пешка
// ==========================================

function getPawnMoves(piece, row, col) {

    const moves = [];

    const direction = piece.color === "white"
        ? -1
        : 1;

    const startRow = piece.color === "white"
        ? 6
        : 1;

    // Вперёд на одну клетку

    if (game.board[row + direction]?.[col] === null) {

        moves.push({

            row: row + direction,

            col,

            type: "move"

        });

        // Первый ход

        if (

            row === startRow &&
            game.board[row + direction * 2]?.[col] === null

        ) {

            moves.push({

                row: row + direction * 2,

                col,

                type: "move"

            });

        }

    }

    // ==========================================
// Взятие по диагонали
// ==========================================

    const captureOffsets = [-1, 1];

    captureOffsets.forEach(offset => {

        const targetRow = row + direction;

        const targetCol = col + offset;

        const targetPiece =
            game.board[targetRow]?.[targetCol];

        if (
            targetPiece &&
            targetPiece.color !== piece.color
        ) {

            moves.push({

                row: targetRow,

                col: targetCol,

                type: "capture"

            });

        }

    });

// ==========================================
// Взятие на проходе
// ==========================================

    const lastMove = game.lastMove;

    if (!lastMove) {

        return moves;

    }

    const isEnemyPawn =

        lastMove.piece.type === "pawn" &&
        lastMove.piece.color !== piece.color;

    if (!isEnemyPawn) {

        return moves;

    }

    const movedTwoSquares =

        Math.abs(

            lastMove.fromRow -
            lastMove.toRow

        ) === 2;

    if (!movedTwoSquares) {

        return moves;

    }

// Белая пешка должна быть на 5-й горизонтали,
// чёрная — на 4-й.

    const correctRow =

        piece.color === "white"
            ? row === 3
            : row === 4;

    if (!correctRow) {

        return moves;

    }

// Пешки должны стоять рядом

    const adjacentPawn =

        lastMove.toRow === row &&
        Math.abs(lastMove.toCol - col) === 1;

    if (!adjacentPawn) {

        return moves;

    }

// Клетка назначения должна быть пустой

    const targetRow = row + direction;
    const targetCol = lastMove.toCol;

    if (game.board[targetRow][targetCol] !== null) {

        return moves;

    }

    moves.push({

        row: row + direction,

        col: lastMove.toCol,

        type: "en-passant",

        captureRow: row,

        captureCol: lastMove.toCol

    });

    return moves;

}

function getPawnAttackMoves(piece, row, col) {

    const moves = [];

    const direction = piece.color === "white"
        ? -1
        : 1;

    [-1, 1].forEach(offset => {

        const targetRow = row + direction;
        const targetCol = col + offset;

        if (

            targetRow >= 0 &&
            targetRow < 8 &&
            targetCol >= 0 &&
            targetCol < 8

        ) {

            moves.push({

                row: targetRow,
                col: targetCol,
                type: "attack"

            });

        }

    });

    return moves;

}

// ==========================================
// Ладья
// ==========================================

function getRookMoves(piece, row, col) {

    const rookDirections = [

        [-1, 0],
        [1, 0],

        [0, -1],
        [0, 1]

    ];

    return getSlidingMoves(
        piece,
        row,
        col,
        rookDirections
    );

}

// ==========================================
// Конь
// ==========================================

function getKnightMoves(piece, row, col) {

    const moves = [];

    const offsets = [

        [-2, -1],
        [-2, 1],

        [-1, -2],
        [-1, 2],

        [1, -2],
        [1, 2],

        [2, -1],
        [2, 1]

    ];

    offsets.forEach(([rowOffset, colOffset]) => {

        const targetRow = row + rowOffset;

        const targetCol = col + colOffset;

        // За пределами доски

        if (

            targetRow < 0 ||
            targetRow > 7 ||
            targetCol < 0 ||
            targetCol > 7

        ) {

            return;

        }

        const targetPiece = game.board[targetRow][targetCol];

        // Пустая клетка

        if (targetPiece === null) {

            moves.push({

                row: targetRow,

                col: targetCol,

                type: "move"

            });

            return;

        }

        // Фигура противника

        if (targetPiece.color !== piece.color) {

            moves.push({

                row: targetRow,

                col: targetCol,

                type: "capture"

            });

        }

    });

    return moves;

}

// ==========================================
// Слон
// ==========================================

function getBishopMoves(piece, row, col) {

    const bishopDirections = [

        [-1, -1],
        [-1, 1],

        [1, -1],
        [1, 1]

    ];

    return getSlidingMoves(

        piece,
        row,
        col,
        bishopDirections

    );

}

// ==========================================
// Ферзь
// ==========================================

function getQueenMoves(piece, row, col) {

    const queenDirections = [

        // Ладья

        [-1, 0],
        [1, 0],

        [0, -1],
        [0, 1],

        // Слон

        [-1, -1],
        [-1, 1],

        [1, -1],
        [1, 1]

    ];

    return getSlidingMoves(

        piece,
        row,
        col,
        queenDirections

    );

}

// ==========================================
// Король
// ==========================================

function getKingMoves(piece, row, col) {

    const moves = [];

    const offsets = [

        [-1, -1],
        [-1, 0],
        [-1, 1],

        [0, -1],
        [0, 1],

        [1, -1],
        [1, 0],
        [1, 1]

    ];

    offsets.forEach(([rowOffset, colOffset]) => {

        const targetRow = row + rowOffset;
        const targetCol = col + colOffset;

        // За пределами доски

        if (

            targetRow < 0 ||
            targetRow > 7 ||
            targetCol < 0 ||
            targetCol > 7

        ) {

            return;

        }

        const targetPiece = game.board[targetRow][targetCol];

        // Пустая клетка

        if (targetPiece === null) {

            moves.push({

                row: targetRow,
                col: targetCol,
                type: "move"

            });

            return;

        }

        // Вражеская фигура

        if (targetPiece.color !== piece.color) {

            moves.push({

                row: targetRow,
                col: targetCol,
                type: "capture"

            });

        }

    });

    return moves;

}