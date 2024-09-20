const ARROW_HEIGHT = 64;
const ARROW_WIDTH = 64;
const TAU = Math.PI * 2;

const params = new URLSearchParams(location.search);
const string = params.get("s") || "ULRDULRDURLDURLD";
const stream = string.split("").filter((char) => char.match(/[LDURldur2468]/));

const numBeats = stream.length;
const canvas = document.querySelector("canvas");
canvas.setAttribute("height", ARROW_HEIGHT / 2 * (numBeats + 1));
canvas.setAttribute("width", ARROW_WIDTH * 4);
const context = canvas.getContext("2d");

let y = 0;
for (let beat of stream) {
    let positions = arrowPositions(beat);
    for (let position of positions) {
        drawArrow(position, y);
    }
    y += ARROW_HEIGHT / 2;
}

function drawArrow(position, y) {
    const arrow = y % ARROW_HEIGHT === 0 ?
        document.getElementById("arrow-red") :
        document.getElementById("arrow-blue");
    let rotation = 0;
    let x = position * ARROW_WIDTH;
    if (position === 0) {
        rotation = TAU / 4;
        x += ARROW_WIDTH;
    }
    if (position === 2) {
        rotation = TAU / 2;
        x += ARROW_WIDTH;
        y += ARROW_HEIGHT;
    }
    if (position === 3) {
        rotation = TAU / -4;
        y += ARROW_HEIGHT;
    }
    context.resetTransform();
    context.translate(x, y);
    context.rotate(rotation);
    context.drawImage(arrow, 0, 0);
}

function arrowPositions(beat) {
    const result = [];
    if (beat.match(/[Ll4]/)) {
        result.push(0);
    }
    if (beat.match(/[Dd2]/)) {
        result.push(1);
    }
    if (beat.match(/[Uu8]/)) {
        result.push(2);
    }
    if (beat.match(/[Rr6]/)) {
        result.push(3);
    }
    return result;
}
