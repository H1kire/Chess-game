const PIECE_FOLDER = "assets/pieces/base";

export function createPiece(type, color) {

    return {

        id: crypto.randomUUID(),

        type,

        color,

        moved:false

    };

}

export function getPieceImagePath(piece){

    return `${PIECE_FOLDER}/${piece.color}-${piece.type}.svg`;

}