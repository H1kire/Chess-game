import { game } from "./game.js";


let timerInterval = null;


// ==========================================
// Формат времени
// ==========================================

export function formatTime(seconds) {

    const minutes =
        Math.floor(seconds / 60);

    const secs =
        seconds % 60;


    return (
        String(minutes).padStart(2, "0")
        +
        ":"
        +
        String(secs).padStart(2, "0")
    );

}


// ==========================================
// Запуск таймера
// ==========================================

export function startTimer() {

    if (timerInterval) {

        return;

    }


    timerInterval = setInterval(() => {


        const player =
            game.currentPlayer;


        if (
            game.timers[player] > 0
        ) {

            game.timers[player]--;

        }


        renderTimers();


    }, 1000);

}


// ==========================================
// Остановка таймера
// ==========================================

export function stopTimer() {

    if (timerInterval) {

        clearInterval(timerInterval);

        timerInterval = null;

    }

}


// ==========================================
// Обновление отображения таймеров
// ==========================================

export function renderTimers() {

    const whiteTimer =
        document.getElementById("white-timer");


    const blackTimer =
        document.getElementById("black-timer");


    if (whiteTimer) {

        whiteTimer.textContent =
            formatTime(game.timers.white);

    }


    if (blackTimer) {

        blackTimer.textContent =
            formatTime(game.timers.black);

    }

    updateActiveTimer();

}

export function updateActiveTimer() {


    const whiteTimer =
        document.getElementById("white-timer");


    const blackTimer =
        document.getElementById("black-timer");


    if (!whiteTimer || !blackTimer) {

        return;

    }


    whiteTimer.classList.remove("active");

    blackTimer.classList.remove("active");


    if (game.currentPlayer === "white") {

        whiteTimer.classList.add("active");

    } else {

        blackTimer.classList.add("active");

    }

}








