let cols = 12;
let rows = 18;
let size = 35;
let gap = -4;
let corners = 3;

function setup() {
    createCanvas(innerWidth, innerHeight);
    background(255);
    noLoop();
}

function draw() {
    let gridWidth = cols * size + (cols - 1) * gap;
    let gridHeight = rows * size + (rows - 1) * gap;

    let startX = (width - gridWidth) / 2;
    let startY = (height - gridHeight) / 2;
    
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = startX + i * (size + gap) + size / 2;
            let y = startY + j * (size + gap) + size / 2;

            let chaos = map(j / 2, 0, rows - 1, 0, PI / 2); 
            let angle = random(-chaos, chaos);

            push();
            translate(x, y);
            rotate(PI / 6 + angle);
            noFill();
            stroke(0);
            beginShape();
            for (let k = 0; k <= corners; k++) {
                let angle = (TWO_PI / corners) * k;
                let coordX = cos(angle) * size / 2;
                let coordY = sin(angle) * size / 2;
                vertex(coordX, coordY);
            }
            endShape(CLOSE);
            pop();
        }
    }
}