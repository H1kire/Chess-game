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