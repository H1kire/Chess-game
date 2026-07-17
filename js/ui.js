import { game } from "./game.js";
import { renderBoard } from "./board.js";
import { getLegalMoves } from "./moves.js";
import { isMoveLegal } from "./validate.js";
import { saveGameState } from "./history.js";
import {

    addMoveToHistory,
    createMoveText

} from "./history.js";
import { renderCapturedPieces } from "./captured.js";


export async function selectSquare(row, col) {

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

            saveGameState();

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
            // Взятие на проходе
            // ==========================================

            if (move.type === "en-passant") {

                const capturedPiece =
                    game.board[
                        game.selected.row
                        ][
                        col
                        ];

                if (capturedPiece) {

                    if (capturedPiece.color === "white") {

                        game.capturedWhite.push(capturedPiece);

                    } else {

                        game.capturedBlack.push(capturedPiece);

                    }

                    game.board[
                        game.selected.row
                        ][
                        col
                        ] = null;

                }

            }

            // ==========================================
            // Перемещение
            // ==========================================

            // ==========================================
            // Короткая рокировка
            // ==========================================

            if (move.type === "castle-short") {

                const rook = game.board[row][7];

                game.board[row][5] = rook;

                game.board[row][7] = null;

                rook.moved = true;

            }

            // ==========================================
            // Длинная рокировка
            // ==========================================

            if (move.type === "castle-long") {

                const rook = game.board[row][0];

                game.board[row][3] = rook;

                game.board[row][0] = null;

                rook.moved = true;

            }

            game.board[row][col] = selectedPiece;

            game.board[game.selected.row][game.selected.col] = null;

            selectedPiece.moved = true;

            game.lastMove = {

                piece: selectedPiece,

                fromRow: game.selected.row,

                fromCol: game.selected.col,

                toRow: row,

                toCol: col

            };
            game.lastMoveHighlight = {

                fromRow: game.selected.row,

                fromCol: game.selected.col,

                toRow: row,

                toCol: col

            };


            const needPromotion =
                promotePawn(row, col);

            if (needPromotion) {

                const pieceType =
                    await showPromotion(
                        selectedPiece.color
                    );

                selectedPiece.type =
                    pieceType;

            }

            const moveText = createMoveText(

                selectedPiece,

                game.lastMove.fromRow,
                game.lastMove.fromCol,

                game.lastMove.toRow,
                game.lastMove.toCol

            );

            addMoveToHistory(moveText);

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

            renderCapturedPieces();

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

    const moves = getLegalMoves(

        piece,
        row,
        col

    );

    game.legalMoves = moves.filter(move => {

        return isMoveLegal(

            row,
            col,
            move.row,
            move.col

        );

    });

    renderBoard();

}








