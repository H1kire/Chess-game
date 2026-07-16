import { game } from "./game.js";
import { getPieceSvg, createPiece } from "./pieces.js";

let resolvePromotion = null;

// ==========================================
// Превращение пешки
// ==========================================



export function promotePawn(row, col) {

    const piece = game.board[row][col];

    if (!piece) {

        return false;

    }

    if (piece.type !== "pawn") {

        return false;

    }

    if (

        piece.color === "white" &&
        row !== 0

    ) {

        return false;

    }

    if (

        piece.color === "black" &&
        row !== 7

    ) {

        return false;

    }

    return true;

}

export async function showPromotion(color) {

    const modal =
        document.getElementById("promotion-modal");

    const buttons =
        modal.querySelectorAll("button");

    for (const button of buttons) {

        const type = button.dataset.piece;

        const piece =
            createPiece(type, color);

        const svg =
            await getPieceSvg(piece);

        button.innerHTML = `
        <div class="piece ${piece.color}">
            ${svg}
        </div>
    `;

    }

    modal.classList.remove("promotion-hidden");

    return new Promise(resolve => {

        resolvePromotion = resolve;

    });

}

export function finishPromotion(pieceType) {

    const modal =
        document.getElementById("promotion-modal");

    modal.classList.add("promotion-hidden");

    if (resolvePromotion) {

        resolvePromotion(pieceType);

        resolvePromotion = null;

    }

}

const buttons =
    document.querySelectorAll("#promotion-options button");

buttons.forEach(button => {

    button.addEventListener("click", () => {

        finishPromotion(button.dataset.piece);

    });

});


