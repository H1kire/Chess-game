import { game } from "./game.js";

// ==========================================
// Движение по лучам
// ==========================================

export function getSlidingMoves(piece, row, col, directions) {

    const moves = [];

    directions.forEach(([rowDirection, colDirection]) => {

        let currentRow = row + rowDirection;
        let currentCol = col + colDirection;

        while (

            currentRow >= 0 &&
            currentRow < 8 &&
            currentCol >= 0 &&
            currentCol < 8

            ) {

            const targetPiece =
                game.board[currentRow][currentCol];

            // ==========================
            // Пустая клетка
            // ==========================

            if (targetPiece === null) {

                moves.push({

                    row: currentRow,

                    col: currentCol,

                    type: "move"

                });

            }

                // ==========================
                // Есть фигура
            // ==========================

            else {

                // Вражеская

                if (targetPiece.color !== piece.color) {

                    moves.push({

                        row: currentRow,

                        col: currentCol,

                        type: "capture"

                    });

                }

                // После любой фигуры луч заканчивается

                break;

            }

            currentRow += rowDirection;
            currentCol += colDirection;

        }

    });

    return moves;

}