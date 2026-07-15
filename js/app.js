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


import {

    createBoard,
    startNewGame,
    renderBoard

} from "./board.js";

window.addEventListener("DOMContentLoaded", () => {

    createBoard();

    startNewGame();

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





});