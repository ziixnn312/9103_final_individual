let doveImg;
let dots = [];
let state = "expanding";
let stateTimer = 0;
let explosionStrength = 0;

function preload() {
  doveImg = loadImage("assets/dovefinal.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  doveImg.resize(1000, 0);
  doveImg.loadPixels();

  let offsetX = (width - doveImg.width) / 2;
  let offsetY = (height - doveImg.height) / 2;

  for (let y = 0; y < doveImg.height; y += 3) {
    for (let x = 0; x < doveImg.width; x += 3) {
      let i = (x + y * doveImg.width) * 4;
      let brightness = (doveImg.pixels[i] + doveImg.pixels[i + 1] + doveImg.pixels[i + 2]) / 3;
      if (brightness < 50) {
        let px = x + offsetX + random(-1.5, 1.5);
        let py = y + offsetY + random(-1.5, 1.5);
        dots.push(new Dot(px, py));
      }
    }
  }

  noStroke();
}

function draw() {
  background(0);
  updateState();

  for (let dot of dots) {
    dot.update(explosionStrength);
    dot.display();
  }
}

function updateState() {
  stateTimer++;
  if (state === "expanding") {
    explosionStrength = min(explosionStrength + 0.08, 5);
    if (explosionStrength === 5) state = "contracting";
  } else if (state === "contracting") {
    explosionStrength = max(explosionStrength - 0.12, 1);
    if (explosionStrength === 1) {
      state = "waiting";
      stateTimer = 0;
    }
  } else if (state === "waiting" && stateTimer > 15) {
    state = "expanding";
  }
}

class Dot {
  constructor(x, y) {
    this.origin = createVector(x, y);
    this.pos = this.origin.copy();
    this.vel = p5.Vector.random2D().mult(random(3));
    this.size = createVector(random(3.5, 5), random(2, 3.5));
    this.gray = random(80, 200);
    this.defaultColor = color(this.gray);
    this.color = this.defaultColor;
    this.isColorful = false;
    this.colorLifespan = 0;
  }

  update(strength) {
    let push = p5.Vector.sub(this.pos, this.origin).normalize().mult(strength);
    let pull = p5.Vector.sub(this.origin, this.pos).mult(0.05);
    this.vel.add(push).add(pull).mult(0.9);
    if (state === "waiting") this.pos.add(p5.Vector.random2D().mult(0.3));
    this.pos.add(this.vel);

    if (this.isColorful) {
      this.colorLifespan--;
      if (this.colorLifespan > 0) {
        this.color = lerpColor(this.color, this.defaultColor, 0.05);
      } else {
        this.isColorful = false;
        this.color = this.defaultColor;
      }
    }
  }

  display() {
    let alpha = 150 + 100 * sin(10 + frameCount * 0.02 + this.pos.y * 0.005);
    fill(red(this.color), green(this.color), blue(this.color), alpha);
    ellipse(this.pos.x, this.pos.y, this.size.x, this.size.y);
  }
}

function mousePressed() {
  for (let dot of dots) {
    if (dist(mouseX, mouseY, dot.pos.x, dot.pos.y) < 20) {
      dot.isColorful = true;
      dot.colorLifespan = 80;
      dot.color = color(
        random([255, 255, random(200, 255), random(100, 180)]),
        random([255, 255, random(200, 255), random(100, 180)]),
        random([255, 255, random(200, 255), random(100, 180)])
      );
    }
  }
}

