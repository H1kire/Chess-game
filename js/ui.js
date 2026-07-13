import { game } from "./game.js";
import { renderBoard } from "./board.js";
import { getLegalMoves } from "./moves.js";

export function selectSquare(row, col) {

    const piece = game.board[row][col];

    // ============================
    // Если уже выбрана фигура
    // ============================

    if (game.selected) {

        const isLegalMove = game.legalMoves.some(move => {

            return move.row === row && move.col === col;

        });

        if (isLegalMove) {

            const selectedPiece =
                game.board[game.selected.row][game.selected.col];

            game.board[row][col] = selectedPiece;

            game.board[game.selected.row][game.selected.col] = null;

            // Меняем игрока

            game.currentPlayer =
                game.currentPlayer === "white"
                    ? "black"
                    : "white";

            // Сбрасываем выбор


            game.selected = null;

            game.legalMoves = [];

            renderBoard();

            return;

        }

    }

    // ============================
    // Клик по пустой клетке
    // ============================

    if (!piece) {

        game.selected = null;

        game.legalMoves = [];

        renderBoard();

        return;

    }

    // ============================
    // Не свой ход
    // ============================

    if (piece.color !== game.currentPlayer) {

        return;

    }

    // ============================
    // Выбор фигуры
    // ============================

    game.selected = {

        row,

        col

    };

    game.legalMoves =
        getLegalMoves(piece, row, col);

    renderBoard();

}