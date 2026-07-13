import { game } from "./game.js";

import {

    createBoard,
    startNewGame,
    renderBoard

} from "./board.js";

window.addEventListener("DOMContentLoaded", () => {

    createBoard();

    startNewGame();


    renderBoard();

});