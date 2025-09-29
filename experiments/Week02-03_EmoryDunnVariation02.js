// idea from https://emorydunn.com/blog/2020/04/01/processing-&-generative-art/
// code snippets from https://codepen.io/pixelkind/pen/OJrRzOm

let agents = [];
let amount;
let field = [];
let fieldSize = 25;
let cols, rows;
let sx, sy, size;

class Agent {
  constructor(x1, y1, x2, y2, maxSpeed, maxForce) {
    this.start = createVector(x1, y1);
    this.end = createVector(x2, y2);
    this.position = this.start.copy();
    this.lastPosition = this.start.copy();
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);

    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
    this.finished = false;
  }

  follow(field) {
  const x = floor(this.position.x / fieldSize);
  const y = floor(this.position.y / fieldSize);

  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    let desired = field[x][y].copy();
    desired.mult(this.maxSpeed);
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }
}

  attractToEnd() {
    let desired = p5.Vector.sub(this.end, this.position);
    let d = desired.mag();
    if (d < 1) {
      this.finished = true;
      this.velocity.mult(0);
      return;
    }
    desired.setMag(this.maxSpeed);
    let steer = p5.Vector.sub(desired, this.velocity);

    let strength = map(d, 0, 50, 2, 0.5); 
    strength = constrain(strength, 0.5, 2);
    steer.limit(this.maxForce * strength);

    this.applyForce(steer);
  }


  applyForce(f) {
    this.acceleration.add(f);
  }

  update() {
    this.lastPosition = this.position.copy();
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);

    if (this.position.x < 0) this.position.x = width - 1;
    if (this.position.x >= width) this.position.x = 0;
    if (this.position.y < 0) this.position.y = height - 1;
    if (this.position.y >= height) this.position.y = 0;
  }

  draw() {
    stroke(255);
    strokeWeight(0.3);

    let dx = abs(this.position.x - this.lastPosition.x);
    let dy = abs(this.position.y - this.lastPosition.y);

    if (dx < width / 2 && dy < height / 2) {
      line(this.lastPosition.x, this.lastPosition.y,
          this.position.x, this.position.y);
    }
  }
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(0);

  size = 300;
  amount = 500;
  sx = width / 2 - size / 2;
  sy = height / 2 - size / 2;

  cols = ceil(width / fieldSize) + 2;
  rows = ceil(height / fieldSize) + 2;
  for (let x = 0; x < cols; x++) {
    field[x] = [];
    for (let y = 0; y < rows; y++) {
      let angle = noise(x * 0.1, y * 0.1) * TWO_PI * 2;
      field[x][y] = p5.Vector.fromAngle(angle);
    }
  }

  for (let i = 0; i < amount; i++) {
  let edge = floor(random(4));
  let x1, y1;

  if (edge == 0) {
    x1 = random(sx, sx + size);
    y1 = sy;
  } else if (edge == 1) {
    x1 = sx + size;
    y1 = random(sy, sy + size);
  } else if (edge == 2) {
    x1 = random(sx, sx + size);
    y1 = sy + size;
  } else {
    x1 = sx;
    y1 = random(sy, sy + size);
  }

  if (edge == 0) {
    x2 = random(sx, sx + size);
    y2 = sy;
  } else if (edge == 1) {
    x2 = sx + size;
    y2 = random(sy, sy + size);
  } else if (edge == 2) {
    x2 = random(sx, sx + size);
    y2 = sy + size;
  } else {
    x2 = sx;
    y2 = random(sy, sy + size);
  }

  agents.push(new Agent(x1, y1, x2, y2, 2, 0.3));
}


  stroke(255);
  strokeWeight(0.5);
  noFill();
  square(sx, sy, size);
}

function draw() {
  for (let agent of agents) {
    if (!agent.finished) {
      let d = p5.Vector.dist(agent.position, agent.end);

      if (d > 50) {
        agent.follow(field);
      }
      agent.attractToEnd();
      agent.update();
      agent.draw();
    }
  }
}

