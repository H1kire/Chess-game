export const defaultGameState = {

    board: [],

    currentPlayer: "white",

    selected: null,

    legalMoves: [],

    lastMove: null,

    capturedWhite: [],

    capturedBlack: [],

    flipped: false,

    settings: {

        pieceTheme: "base"

    }

};

export const game = structuredClone(defaultGameState);