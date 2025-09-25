amount = 200;

function setup() {
    createCanvas(innerWidth, innerHeight);
    background(255);
    noLoop();
}

function draw() {
    let cx = width / 2;
    let cy = height / 2;
    let maxRadius = 250;

    noFill();

    for (let i = 0; i < amount; i++) {
        let angle = random(TWO_PI);
        let position = sqrt(random()) * maxRadius;
        
        let x = cx + cos(angle) * position;
        let y = cy + sin(angle) * position;

        // let rectWidth = random(5, 20);
        // let rectHeight = random(3, 9);
        
        push();
        translate(x, y);

        if (random(1) < 0.5) {
        rotate(HALF_PI);
        }

        circle(0, 0, random(2, 60));
        pop();
    }
}