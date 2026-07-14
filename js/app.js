import { game } from "./game.js";
import { findKing } from "./check.js";
import { isSquareAttacked } from "./attacks.js";
import { isKingInCheck } from "./check.js";

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



});