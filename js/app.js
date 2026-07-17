import { game } from "./game.js";
import { findKing } from "./check.js";
import { isSquareAttacked } from "./attacks.js";
import { isKingInCheck } from "./check.js";
import { isMoveLegal } from "./validate.js";
import { hasLegalMoves } from "./check.js";
import {

    isCheckmate,
    isStalemate

} from "./check.js";
import { promotePawn } from "./promotion.js";
import { debugBoard } from "./debug.js";
import { showPromotion } from "./promotion.js";
import { resetGame } from "./newGame.js";
import { undoMove } from "./history.js";
import { renderCapturedPieces } from "./captured.js";
import {

    createBoard,
    startNewGame,
    renderBoard

} from "./board.js";





window.addEventListener("DOMContentLoaded", () => {

    createBoard();

    startNewGame();

    const newGameButton =
        document.getElementById("new-game");

    newGameButton.addEventListener("click", () => {

        resetGame();

    });
    const undoButton =
        document.getElementById("undo");

    undoButton.addEventListener("click", () => {

        undoMove();

    });


    window.game = game;
    window.renderBoard = renderBoard;
    window.findKing = findKing;
    window.isSquareAttacked = isSquareAttacked;
    window.isKingInCheck = isKingInCheck;
    window.isMoveLegal = isMoveLegal;
    window.hasLegalMoves = hasLegalMoves;
    window.isCheckmate = isCheckmate;
    window.isStalemate = isStalemate;
    window.promotePawn = promotePawn;
    window.debugBoard = debugBoard;
    window.showPromotion = showPromotion;
    window.renderCapturedPieces = renderCapturedPieces;




});






