import { game } from "./game.js";

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