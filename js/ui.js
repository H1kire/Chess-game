import { game } from "./game.js";
import { renderBoard } from "./board.js";
import { getLegalMoves } from "./moves.js";

export function selectSquare(row, col) {

    const piece = game.board[row][col];

    // ==========================================
    // Есть выбранная фигура
    // ==========================================

    if (game.selected) {

        const move = game.legalMoves.find(move => {

            return move.row === row &&
                move.col === col;

        });

        if (move) {

            const selectedPiece =
                game.board[game.selected.row][game.selected.col];

            // ==========================================
            // Взятие
            // ==========================================

            if (move.type === "capture") {

                const capturedPiece = game.board[row][col];

                if (capturedPiece) {

                    if (capturedPiece.color === "white") {

                        game.capturedWhite.push(capturedPiece);

                    } else {

                        game.capturedBlack.push(capturedPiece);

                    }

                }

            }

            // ==========================================
            // Перемещение
            // ==========================================

            game.board[row][col] = selectedPiece;

            game.board[game.selected.row][game.selected.col] = null;

            // ==========================================
            // Смена игрока
            // ==========================================

            game.currentPlayer =
                game.currentPlayer === "white"
                    ? "black"
                    : "white";

            game.selected = null;

            game.legalMoves = [];

            renderBoard();

            return;

        }

    }

    // ==========================================
    // Пустая клетка
    // ==========================================

    if (!piece) {

        game.selected = null;

        game.legalMoves = [];

        renderBoard();

        return;

    }

    // ==========================================
    // Не свой ход
    // ==========================================

    if (piece.color !== game.currentPlayer) {

        return;

    }

    // ==========================================
    // Выбор фигуры
    // ==========================================

    game.selected = {

        row,

        col

    };

    game.legalMoves = getLegalMoves(piece, row, col);

    renderBoard();

}