import { game } from "./game.js";
import { renderBoard } from "./board.js";
export function selectSquare(row, col) {

    const piece = game.board[row][col];

    if (!piece) {

        game.selected = null;

        renderBoard();

        return;

    }

    if (piece.color !== game.currentPlayer) {

        return;

    }

    game.selected = {

        row,

        col

    };

    renderBoard();

}