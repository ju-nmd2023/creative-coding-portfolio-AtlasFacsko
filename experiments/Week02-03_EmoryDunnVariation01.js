// idea from https://emorydunn.com/blog/2020/04/01/processing-&-generative-art/
// flow field code snippets from https://codepen.io/pixelkind/pen/OJrRzOm
// particle code snippets from https://codepen.io/pixelkind/pen/VwqKyoP

let agents = [];
let particles = [];
let cx, cy, r;

let numberParticles = 100;
let jitter = 5;

class Agent {
  constructor(x1, y1, x2, y2, speed) {
    this.start = createVector(x1, y1);
    this.end = createVector(x2, y2);
    this.position = this.start.copy();
    this.lastPosition = this.start.copy();
    this.speed = speed;
  }

  moveStraight() {
    let dir = p5.Vector.sub(this.end, this.position);
    let d = dir.mag();

    if (d < this.speed) {
      generateParticles(this.end.x, this.end.y, 80);

      let temp = this.start;
      this.start = this.end;
      this.end = temp;

      this.position = this.start.copy();
      this.lastPosition = this.start.copy();
      return;
    }

    dir.setMag(this.speed);
    this.position.add(dir);
  }

  update() {
    this.lastPosition = this.position.copy();
    this.moveStraight();
  }

  draw() {
    stroke(255);
    strokeWeight(1);
    line(this.lastPosition.x, this.lastPosition.y,
         this.position.x, this.position.y);
  }
}

class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    const a = random(TWO_PI);
    const v = 0.2 + random(1.0);
    this.velocity = createVector(cos(a) * v, sin(a) * v);
    this.lifespan = 80 + random(60);
    this.size = random(2, 4);
  }

  update() {
    this.lifespan--;
    this.velocity.mult(0.98);
    this.position.add(this.velocity);
  }

  draw() {
    noStroke();
    fill(255, this.lifespan);
    circle(this.position.x, this.position.y, this.size);
  }

  isDead() {
    return this.lifespan <= 0;
  }
}

function generateParticles(x, y, count) {
  for (let i = 0; i < count; i++) {
    const px = x + random(-jitter, jitter);
    const py = y + random(-jitter, jitter);
    particles.push(new Particle(px, py));
  }
}

function setup() {
    createCanvas(innerWidth, innerHeight);
    background(0);

    cx = width / 2;
    cy = height / 2;
    r = 250;

    for (let i = 0; i < 50; i++) {
        let angle1 = random(TWO_PI);
        let angle2 = random(TWO_PI);

        let x1 = cx + cos(angle1) * r;
        let y1 = cy + sin(angle1) * r;

        let x2 = cx + cos(angle2) * r;
        let y2 = cy + sin(angle2) * r;

        agents.push(new Agent(x1, y1, x2, y2, 2));
    }

    stroke(255);
    strokeWeight(0.3);
    noFill();
    circle(cx, cy, r * 2);
}

function draw() {
    background(0, 15);

    stroke(255);
    strokeWeight(0.3);
    noFill();
    circle(cx, cy, r * 2);

    for (let agent of agents) {
        if (!agent.finished) {
        agent.update();
        }
        agent.draw();
    }

    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].isDead()) {
        particles.splice(i, 1);
        }
    }

    if (agents.every(a => a.finished) && particles.length === 0) {
        noLoop();
    }
}