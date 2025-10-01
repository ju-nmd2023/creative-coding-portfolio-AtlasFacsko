// idea from https://observablehq.com/@cpreid2/circle-packing?collection=@cpreid2/generative-art

let circles = [];
let queue = [];
let minRadius = 5;
let maxRadius = 100;

let amount = 2000;
let synth;
let audioReady = false;

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(0);
  noLoop();

  startButton = createButton("Start");
  startButton.style("font-size", "20px");
  startButton.style("padding", "10px 20px");
  startButton.position(width / 2, height / 2);

  synth = new Tone.Synth().toDestination();

  fill(0, random(100, 150), random(200));
  noStroke();
}

function mousePressed() {
  if (!audioReady) {
    Tone.start().then(() => {
      synth = new Tone.Synth().toDestination();
      audioReady = true;
      startButton.remove();
      loop();
    });
  }
}

function hasCollision(circle) {
  for (let i = 0; i < circles.length; i++) {
    let other = circles[i];
    let dx = circle.x - other.x;
    let dy = circle.y - other.y;
    let distance = dx * dx + dy * dy;
    let radSum = circle.radius + other.radius;
    
    if (distance <= radSum * radSum) return true;
  }

  if (circle.x - circle.radius < 0 ||
      circle.x + circle.radius > width ||
      circle.y - circle.radius < 0 ||
      circle.y + circle.radius > height) return true;

  return false;
}

function makeCluster(x, y, baseRadius) {
  for (let i = 0; i < 3; i++) {
    let r = baseRadius - i * (baseRadius * 0.3);
    if (r > 0) {
      queue.push({ x, y, radius: r });
    }
  }
}

function drawOneCircle() {
  if (queue.length === 0) return;

  let circle = queue.shift();
  circles.push(circle);

  fill(random(100), random(50), random(150));
  ellipse(circle.x, circle.y, circle.radius * 2);

  if (audioReady) {
    let freq = map(circle.radius, minRadius, maxRadius, 800, 100);
    synth.triggerAttackRelease(freq, "8n", Tone.now());
  }
}

function draw() {
  if (circles.length >= amount) {
    noLoop();
    return;
  }

  if (queue.length === 0) {
    let newCircle = { x: random(width), y: random(height), radius: minRadius };

    if (!hasCollision(newCircle)) {
      for (let r = minRadius; r < maxRadius; r++) {
        newCircle.radius = r;
        if (hasCollision(newCircle)) {
          newCircle.radius--;
          break;
        }
      }
      makeCluster(newCircle.x, newCircle.y, newCircle.radius);
    }
  }

  if (frameCount % 15 === 0) {
    drawOneCircle();
  }
}