const ARROW_HEIGHT = 64;
const ARROW_WIDTH = 64;


let stream = "ULRDULRDURLDURLD".split("");

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
    const arrowRed = document.getElementById("arrow-red");
    context.drawImage(arrowRed, position * ARROW_WIDTH, y);
}

function arrowPositions(beat) {
    const result = [];
    if (beat.includes("L")) {
        result.push(0);
    }
    if (beat.includes("D")) {
        result.push(1);
    }
    if (beat.includes("U")) {
        result.push(2);
    }
    if (beat.includes("R")) {
        result.push(3);
    }
    return result;
}
