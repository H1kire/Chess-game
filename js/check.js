import { game } from "./game.js";
import { isSquareAttacked } from "./attacks.js";
import { getLegalMoves } from "./moves.js";
import { isMoveLegal } from "./validate.js";


// ==========================================
// Поиск короля
// ==========================================

export function findKing(color) {

    for (let row = 0; row < 8; row++) {

        for (let col = 0; col < 8; col++) {

            const piece = game.board[row][col];

            if (

                piece &&
                piece.type === "king" &&
                piece.color === color

            ) {

                return {

                    row,

                    col

                };

            }

        }

    }

    return null;

}

// ==========================================
// Проверка шаха
// ==========================================

export function isKingInCheck(color) {

    const king = findKing(color);

    if (!king) {

        return false;

    }

    const enemyColor = color === "white"
        ? "black"
        : "white";

    return isSquareAttacked(

        king.row,
        king.col,
        enemyColor

    );

}

// ==========================================
// Есть ли у игрока легальные ходы
// ==========================================

export function hasLegalMoves(color) {

    for (let row = 0; row < 8; row++) {

        for (let col = 0; col < 8; col++) {

            const piece = game.board[row][col];

            if (!piece) {

                continue;

            }

            if (piece.color !== color) {

                continue;

            }

            const moves = getLegalMoves(
                piece,
                row,
                col
            );

            for (const move of moves) {

                if (

                    isMoveLegal(

                        row,
                        col,
                        move.row,
                        move.col

                    )

                ) {

                    return true;

                }

            }

        }

    }

    return false;

}
// ==========================================
// Мат
// ==========================================

export function isCheckmate(color) {

    return (

        isKingInCheck(color) &&
        !hasLegalMoves(color)

    );

}
// ==========================================
// Пат
// ==========================================

export function isStalemate(color) {

    return (

        !isKingInCheck(color) &&
        !hasLegalMoves(color)

    );

}