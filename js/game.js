export const defaultGameState = {

    board: [],

    currentPlayer: "white",

    timers: {

        white: 600,

        black: 600

    },

    selected: null,

    legalMoves: [],

    lastMove: null,

    lastMoveHighlight: null,

    capturedWhite: [],

    capturedBlack: [],

    history: [],

    moveHistory: [],

    flipped: false,

    settings: {

        pieceTheme: "base"

    }

};

export const game = structuredClone(defaultGameState);