import { game } from "./game.js";
import {
    createPiece,
    getPieceImagePath
} from "./pieces.js";

const boardElement = document.getElementById("board");

export function createBoard() {

    boardElement.innerHTML = "";

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

    game.selected = null;

    game.turn = "white";

    game.capturedWhite = [];

    game.capturedBlack = [];

    createEmptyBoard();

    setupPieces();

    renderBoard();

}

export function renderBoard() {

    const squares = document.querySelectorAll(".square");

    squares.forEach(square => {

        const row = Number(square.dataset.row);

        const col = Number(square.dataset.col);

        const piece = game.board[row][col];

        square.innerHTML = "";

        if (!piece) {

            return;

        }

        const image = document.createElement("img");

        image.className = "piece";

        image.draggable = false;

        image.src = getPieceImagePath(piece);

        image.alt = `${piece.color} ${piece.type}`;

        square.appendChild(image);

    });

}