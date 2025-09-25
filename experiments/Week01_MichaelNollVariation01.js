amount = 400;

function setup() {
    createCanvas(innerWidth, innerHeight);
    background(255);
    noLoop();
}

function draw() {
    let cx = width / 2;
    let cy = height / 2;
    let maxRadius = 250;

    noStroke();

    for (let i = 0; i < amount; i++) {
        fill(random(255), random(255), random(255));

        let angle = random(TWO_PI);
        let position = sqrt(random()) * maxRadius;
        
        let x = cx + cos(angle) * position;
        let y = cy + sin(angle) * position;
        
        let rectWidth = random(5, 20);
        let rectHeight = random(3, 9);
        
        push();
        translate(x, y);

        if (random(1) < 0.5) {
        rotate(HALF_PI);
        }

        rect(0, 0, rectWidth, rectHeight);
        pop();
    }
}