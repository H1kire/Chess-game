import { game } from "./game.js";

// ==========================================
// Превращение пешки
// ==========================================

export function promotePawn(row, col) {

    const piece = game.board[row][col];

    if (!piece) {

        return;

    }

    if (piece.type !== "pawn") {

        return;

    }

    if (piece.color === "white" && row !== 0) {

        return;

    }

    if (piece.color === "black" && row !== 7) {

        return;

    }

    piece.type = "queen";

}