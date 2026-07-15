import { game } from "./game.js";

export function debugBoard() {

    console.clear();

    game.board.forEach((row, rowIndex) => {

        row.forEach((piece, colIndex) => {

            if (!piece) {

                return;

            }

            console.log(

                `${piece.color} ${piece.type}`,
                `row=${rowIndex}`,
                `col=${colIndex}`

            );

        });

    });

}