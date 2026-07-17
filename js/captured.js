import { game } from "./game.js";
import { getPieceSvg } from "./pieces.js";

// ==========================================
// Захваченные фигуры
// ==========================================

export async function renderCapturedPieces() {

    const container =
        document.getElementById("white-captured");

    container.innerHTML = "";

    for (const piece of game.capturedBlack) {

        const pieceElement =
            document.createElement("div");

        pieceElement.className =
            `piece captured-piece ${piece.color}`;

        pieceElement.innerHTML =
            await getPieceSvg(piece);

        container.appendChild(pieceElement);

    }

}