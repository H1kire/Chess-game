import { game } from "./game.js";
import { renderBoard } from "./board.js";
import { renderCapturedPieces } from "./captured.js";






// ==========================================
// Сохранить состояние игры
// ==========================================

export function saveGameState() {

    game.history.push(

        structuredClone({

            board: game.board,

            currentPlayer: game.currentPlayer,

            selected: game.selected,

            legalMoves: game.legalMoves,

            lastMove: game.lastMove,

            lastMoveHighlight: game.lastMoveHighlight,

            capturedWhite: game.capturedWhite,

            capturedBlack: game.capturedBlack,

            flipped: game.flipped,

            moveHistory: game.moveHistory

        })

    );

}

// ==========================================
// Восстановить предыдущее состояние
// ==========================================

export function restorePreviousState() {

    if (game.history.length === 0) {

        return false;

    }

    const previousState = game.history.pop();

    game.board = previousState.board;

    game.currentPlayer = previousState.currentPlayer;

    game.selected = previousState.selected;

    game.legalMoves = previousState.legalMoves;

    game.lastMove = previousState.lastMove;

    game.lastMoveHighlight = previousState.lastMoveHighlight;

    game.capturedWhite = previousState.capturedWhite;

    game.capturedBlack = previousState.capturedBlack;

    game.moveHistory = previousState.moveHistory;

    game.flipped = previousState.flipped;

    return true;

}
// ==========================================
// Undo
// ==========================================

export function undoMove() {

    const restored =
        restorePreviousState();

    if (!restored) {

        return;

    }

    renderBoard();
    renderMoveHistory();
    renderCapturedPieces();

}
// ==========================================
// Добавить ход в историю
// ==========================================

export function addMoveToHistory(moveText) {

    game.moveHistory.push(moveText);

    renderMoveHistory();

}

// ==========================================
// Отрисовать историю
// ==========================================

export function renderMoveHistory() {

    const historyElement =
        document.getElementById("move-history");

    historyElement.innerHTML = "";

    game.moveHistory.forEach((move, index) => {

        const div = document.createElement("div");

        div.textContent =
            `${index + 1}. ${move}`;

        historyElement.appendChild(div);

    });

}
// ==========================================
// Координаты клетки
// ==========================================

function squareName(row, col) {

    const files = "abcdefgh";

    return files[col] + (8 - row);

}

// ==========================================
// Текст хода
// ==========================================

export function createMoveText(
    piece,
    fromRow,
    fromCol,
    toRow,
    toCol
) {

    const names = {

        pawn: "Pawn",
        rook: "Rook",
        knight: "Knight",
        bishop: "Bishop",
        queen: "Queen",
        king: "King"

    };

    return `${names[piece.type]} ${squareName(fromRow, fromCol)} → ${squareName(toRow, toCol)}`;

}







