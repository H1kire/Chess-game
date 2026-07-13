import { game } from "./game.js";

export function createPiece(type, color) {

    return {

        id: crypto.randomUUID(),

        type,

        color,

        moved: false

    };

}

const svgCache = new Map();

export async function getPieceSvg(piece){

    const path =
        `./assets/pieces/${game.settings.pieceTheme}/${piece.type}.svg`;

    if(svgCache.has(path))
        return svgCache.get(path);

    const response = await fetch(path);

    const svg = await response.text();

    svgCache.set(path, svg);

    return svg;

}