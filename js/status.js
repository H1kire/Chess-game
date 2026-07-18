import { game } from "./game.js";
import {

    isKingInCheck,
    isCheckmate,
    isStalemate

} from "./check.js";

import { showGameOver } from "./gameOver.js";


// ==========================================
// Обновить статус игры
// ==========================================

export function renderGameStatus() {

    const status =
        document.getElementById("game-status");


    if (!status) {

        return;

    }


    // ==========================================
    // Мат
    // ==========================================

    if (isCheckmate(game.currentPlayer)) {

        const winner =
            game.currentPlayer === "white"
                ? "Чёрные"
                : "Белые";

        status.textContent =
            `♔ Мат! Победили ${winner}`;

        game.gameOver = true;

        showGameOver(

            "♔ МАТ",

            `Победили ${winner}`

        );

        return;

    }


    // ==========================================
    // Пат
    // ==========================================

    if (isStalemate(game.currentPlayer)) {

        status.textContent =
            "🤝 Пат! Ничья";

        game.gameOver = true;

        showGameOver(

            "🤝 ПАТ",

            "Ничья"

        );

        return;

    }


    // ==========================================
    // Время вышло
    // ==========================================

    if (game.timers.white <= 0) {

        status.textContent =
            "⏰ Время! Победили чёрные";

        game.gameOver = true;

        showGameOver(

            "⏰ Время",

            "Победили чёрные"

        );

        return;

    }


    if (game.timers.black <= 0) {

        status.textContent =
            "⏰ Время! Победили белые";

        game.gameOver = true;

        showGameOver(

            "⏰ Время",

            "Победили белые"

        );

        return;

    }


    // ==========================================
    // Шах
    // ==========================================

    if (isKingInCheck(game.currentPlayer)) {

        status.textContent =
            game.currentPlayer === "white"
                ? "⚠ Шах белым"
                : "⚠ Шах черным";

        return;

    }


    // ==========================================
    // Обычный ход
    // ==========================================

    status.textContent =
        game.currentPlayer === "white"
            ? "Ход: Белые"
            : "Ход: Черные";

}