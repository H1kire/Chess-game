import { game } from "./game.js";
import { isKingInCheck } from "./check.js";

// ==========================================
// Проверка законности хода
// ==========================================

export function isMoveLegal(

    fromRow,
    fromCol,
    toRow,
    toCol

) {
    if (

        fromRow < 0 || fromRow > 7 ||
        fromCol < 0 || fromCol > 7 ||
        toRow < 0 || toRow > 7 ||
        toCol < 0 || toCol > 7

    ) {

        return false;

    }


    // --------------------------
    // Сохраняем фигуры
    // --------------------------

    const movingPiece = game.board[fromRow][fromCol];

    if (!movingPiece) {

        return false;

    }
    const capturedPiece = game.board[toRow][toCol];

    // --------------------------
    // Делаем ход
    // --------------------------

    game.board[toRow][toCol] = movingPiece;

    game.board[fromRow][fromCol] = null;

    // --------------------------
    // Проверяем шах
    // --------------------------

    const legal = !isKingInCheck(

        movingPiece.color

    );

    // --------------------------
    // Откатываем ход
    // --------------------------

    game.board[fromRow][fromCol] = movingPiece;

    game.board[toRow][toCol] = capturedPiece;

    return legal;

}