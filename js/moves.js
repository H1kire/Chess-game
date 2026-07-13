import { game } from "./game.js";

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

function getRookMoves() {

    return [];

}

// ==========================================
// Конь
// ==========================================

function getKnightMoves() {

    return [];

}

// ==========================================
// Слон
// ==========================================

function getBishopMoves() {

    return [];

}

// ==========================================
// Ферзь
// ==========================================

function getQueenMoves() {

    return [];

}

// ==========================================
// Король
// ==========================================

function getKingMoves() {

    return [];

}