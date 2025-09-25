let cols = 12;
let rows = 18;
let size = 40;
let gap = -8;
let corners = 4;
let angle = 0;
let noiseSpeed = 0.05;

function setup() {
    createCanvas(innerWidth, innerHeight);
}

function draw() {
    background(255);
    let gridWidth = cols * size + (cols - 1) * gap;
    let gridHeight = rows * size + (rows - 1) * gap;

    let startX = (width - gridWidth) / 2;
    let startY = (height - gridHeight) / 2;
    
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let n = noise(i * 0.2, j * 0.2, frameCount * noiseSpeed);
            let squareSize = map(n, 0, 1, 10, 80);
            
            let x = startX + i * (size + gap) + size / 2;
            let y = startY + j * (size + gap) + size / 2;

            push();
            translate(x, y);
            let factor = noise(i * 0.1, j * 0.1);
            rotate((PI / 4) + angle * (j + 0.1) * factor);
            noFill();
            stroke(0);
            beginShape();
            for (let k = 0; k <= corners; k++) {
                let angle = (PI / 2) * k;
                let coordX = cos(angle) * squareSize / 2;
                let coordY = sin(angle) * squareSize / 2;
                vertex(coordX, coordY);
            }
            endShape(CLOSE);
            pop();
        }
    }
    angle += 0.01;
}