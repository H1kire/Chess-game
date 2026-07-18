import {
    createPiece,
    getPieceSvg
} from "./pieces.js";
import { game } from "./game.js";
import { selectSquare } from "./ui.js";
import { renderMoveHistory } from "./history.js";
import { renderCapturedPieces } from "./captured.js";
import { renderGameStatus } from "./status.js";
import { hideGameOver } from "./gameOver.js";
import { renderTimers } from "./timers.js";


const boardElement = document.getElementById("board");
const boardWrapper = document.getElementById("board-wrapper");

function createCoordinates() {

    const oldCoordinates = boardWrapper.querySelectorAll(

        "#files-top, #files-bottom, #ranks-left, #ranks-right"

    );

    oldCoordinates.forEach(element => element.remove());

    const filesTop =
        document.createElement("div");

    filesTop.id = "files-top";

    const filesBottom =
        document.createElement("div");

    filesBottom.id = "files-bottom";

    const ranksLeft =
        document.createElement("div");

    ranksLeft.id = "ranks-left";

    const ranksRight =
        document.createElement("div");

    ranksRight.id = "ranks-right";

    const files = [

        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h"

    ];

    for (const file of files) {

        const top =
            document.createElement("div");

        top.textContent = file;

        filesTop.appendChild(top);

        const bottom =
            document.createElement("div");

        bottom.textContent = file;

        filesBottom.appendChild(bottom);

    }

    for (let rank = 8; rank >= 1; rank--) {

        const left =
            document.createElement("div");

        left.textContent = rank;

        ranksLeft.appendChild(left);

        const right =
            document.createElement("div");

        right.textContent = rank;

        ranksRight.appendChild(right);

    }

    boardWrapper.append(

        filesTop,
        filesBottom,
        ranksLeft,
        ranksRight

    );

}

export function createBoard() {

    boardElement.innerHTML = "";

    createCoordinates();

    for (let row = 0; row < 8; row++) {

        for (let col = 0; col < 8; col++) {

            const square = document.createElement("div");

            square.classList.add("square");

            square.classList.add(
                (row + col) % 2 === 0
                    ? "light"
                    : "dark"
            );

            square.dataset.row = row;
            square.dataset.col = col;

            square.addEventListener("click", () => {

                selectSquare(row, col);

            });

            boardElement.appendChild(square);
        }

    }

}

function createEmptyBoard() {

    game.board = [];

    for (let row = 0; row < 8; row++) {

        const currentRow = [];

        for (let col = 0; col < 8; col++) {

            currentRow.push(null);

        }

        game.board.push(currentRow);

    }

}

function setupPieces() {

    const order = [

        "rook",
        "knight",
        "bishop",
        "queen",
        "king",
        "bishop",
        "knight",
        "rook"

    ];

    for (let i = 0; i < 8; i++) {

        game.board[0][i] = createPiece(order[i], "black");

        game.board[1][i] = createPiece("pawn", "black");

        game.board[6][i] = createPiece("pawn", "white");

        game.board[7][i] = createPiece(order[i], "white");

    }

}

export function startNewGame() {

    hideGameOver();

    game.selected = null;

    game.currentPlayer = "white";

    game.gameOver = false;

    game.flipped = false;

    game.capturedWhite = [];

    game.capturedBlack = [];

    game.lastMove = null;

    game.moveHistory = [];

    game.timers = {

        white: 600,

        black: 600

    };

    createEmptyBoard();

    setupPieces();

    renderBoard();

    renderTimers();

    renderGameStatus();

    renderMoveHistory();

    renderCapturedPieces();

}

export async function renderBoard() {

    const squares = document.querySelectorAll(".square");

    squares.forEach(square => {

        const row = Number(square.dataset.row);
        const col = Number(square.dataset.col);

        // ==========================
        // Сбрасываем подсветки
        // ==========================

        square.classList.remove("selected");
        square.classList.remove("legal-move");
        square.classList.remove("legal-capture");
        square.classList.remove("last-move");

        // ==========================
        // Выбранная фигура
        // ==========================

        if (
            game.selected &&
            game.selected.row === row &&
            game.selected.col === col
        ) {

            square.classList.add("selected");

        }
        // ==========================
        // Последний ход
        // ==========================

        if (

            game.lastMoveHighlight &&

            (

                (

                    game.lastMoveHighlight.fromRow === row &&
                    game.lastMoveHighlight.fromCol === col

                )

                ||

                (

                    game.lastMoveHighlight.toRow === row &&
                    game.lastMoveHighlight.toCol === col

                )

            )

        ) {

            square.classList.add("last-move");

        }
        // ==========================
        // Возможные ходы
        // ==========================

        const move = game.legalMoves.find(move => {

            return (
                move.row === row &&
                move.col === col
            );

        });
        // ==========================
        // Подсветка пешки для en-passant
        // ==========================

        game.legalMoves.forEach(move => {

            if (
                move.type === "en-passant" &&
                move.captureRow === row &&
                move.captureCol === col
            ) {

                square.classList.add("legal-capture");

            }

        });

        if (move) {

            if (

                move.type === "move" ||
                move.type === "castle-short" ||
                move.type === "castle-long"

            ) {

                square.classList.add("legal-move");

            }

            if (
                move.type === "capture" ||
                move.type === "en-passant"
            ) {

                square.classList.add("legal-capture");

            }
            if (move.type === "en-passant") {

                const captureSquare =
                    document.querySelector(
                        `[data-row="${move.captureRow}"][data-col="${move.captureCol}"]`
                    );

                if (captureSquare) {

                    captureSquare.classList.add("legal-capture");

                }

            }

        }

        // ==========================
        // Отрисовка фигуры
        // ==========================

        const piece = game.board[row][col];

        square.innerHTML = "";

        if (!piece) {

            return;

        }

        const pieceElement = document.createElement("div");

        pieceElement.className = `piece ${piece.color}`;

        getPieceSvg(piece).then(svg => {

            pieceElement.innerHTML = svg;

        });

        square.appendChild(pieceElement);

    });

}