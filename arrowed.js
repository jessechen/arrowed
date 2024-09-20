const ARROW_HEIGHT = 64;
const ARROW_WIDTH = 64;
const TAU = Math.PI * 2;

const params = new URLSearchParams(location.search);
const arrowString = params.get("a") || "drudlrdrudrdluldrdluruldrdluruldulurdldrulurduruldrdlrulurl";
const speedString = params.get("s") || "1";
const stream = arrowString.split("").filter((char) => char.match(/[LDURldur2468]/));
let speed = isNaN(parseFloat(speedString)) ? 1 : parseFloat(speedString);
if (speed < 0.5 || speed > 3) {
    speed = 1;
}
const numBeats = stream.length;

const canvas = document.querySelector("canvas");
canvas.setAttribute("height", ARROW_HEIGHT / 2 * (numBeats + 1) * speed);
canvas.setAttribute("width", ARROW_WIDTH * 4);
const context = canvas.getContext("2d");
draw();

async function draw() {
    const arrowImages = await loadImages(["arrow-red.png", "arrow-blue.png"]);
    let y = 0;
    for (let beat of stream) {
        let positions = arrowPositions(beat);
        for (let position of positions) {
            drawArrow(position, y, arrowImages);
        }
        y += ARROW_HEIGHT / 2 * speed;
    }
}

function loadImages(urls) {
    return Promise.all(urls.map((url) => {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = url;
            image.onload = () => resolve(image);
            image.onerror = () => reject(`Image failed to load: ${url}`);
        })
    }))
}

function drawArrow(position, y, arrowImages) {
    const arrow = y % ARROW_HEIGHT === 0 ? arrowImages[0] : arrowImages[1];
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
