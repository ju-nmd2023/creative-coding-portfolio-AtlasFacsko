let amount = 400;
let squares = [];
let maxRadius = 250;

function setup() {
  createCanvas(innerWidth, innerHeight);

  for (let i = 0; i < amount; i++) {
    let angle = random(TWO_PI);
    let baseDist = sqrt(random()) * maxRadius;
    let rectWidth = random(5, 20);
    let rectHeight = random(3, 9);
    let rotated = random(1) < 0.5;

    squares.push({
      angle: angle,
      baseDist: baseDist,
      rectWidth: rectWidth,
      rectHeight: rectHeight,
      rotated: rotated
    });
  }
}

function draw() {
  background(255);

  let cx = width / 2;
  let cy = height / 2;

  let pulse = (sin(frameCount * 0.03) + 1) / 2;

  for (let sq of squares) {
    let position = sq.baseDist * pulse;

    let x = cx + cos(sq.angle) * position;
    let y = cy + sin(sq.angle) * position;

    let shade = map(position, 0, maxRadius, 0, 255);
    fill(shade);
    noStroke();

    push();
    translate(x, y);
    if (sq.rotated) {
      rotate(HALF_PI);
    }
    rect(0, 0, sq.rectWidth, sq.rectHeight);
    pop();
  }
}
