import { startNewGame } from "./board.js";


// ==========================================
// Показать окно окончания игры
// ==========================================

export function showGameOver(title, message) {

    const modal =
        document.getElementById("game-over-modal");

    const titleElement =
        document.getElementById("game-over-title");

    const messageElement =
        document.getElementById("game-over-message");

    const button =
        document.getElementById("game-over-button");


    titleElement.textContent = title;

    messageElement.textContent = message;


    modal.classList.remove("game-over-hidden");


    button.onclick = () => {

        modal.classList.add("game-over-hidden");

        startNewGame();

    };

}


// ==========================================
// Скрыть окно окончания игры
// ==========================================

export function hideGameOver() {

    const modal =
        document.getElementById("game-over-modal");

    modal.classList.add("game-over-hidden");

}