import { game } from "./game.js";
import { getAttackMoves } from "./moves.js";

// ==========================================
// Проверка атаки клетки
// ==========================================

export function isSquareAttacked(row, col, byColor) {

    for (let currentRow = 0; currentRow < 8; currentRow++) {

        for (let currentCol = 0; currentCol < 8; currentCol++) {

            const piece = game.board[currentRow][currentCol];

            if (!piece) {

                continue;

            }

            if (piece.color !== byColor) {

                continue;

            }

            const moves = getAttackMoves(

                piece,
                currentRow,
                currentCol

            );

            const attacks = moves.some(move => {

                return (

                    move.row === row &&
                    move.col === col

                );

            });

            if (attacks) {

                return true;

            }

        }

    }

    return false;

}