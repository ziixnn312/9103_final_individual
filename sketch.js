let doveImg;
let dots = [];
let t = 0;

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
  fill(0);
}

function draw() {
  background(255);
  let explosionStrength = sin(t) * 3;
  t += 0.02;

  for (let dot of dots) {
    dot.update(explosionStrength);
    dot.display();
  }
}

class Dot {
  constructor(x, y) {
    this.origin = createVector(x, y);
    this.pos = this.origin.copy();
    this.vel = p5.Vector.random2D().mult(random(3));
  }

  update(strength) {
    let push = p5.Vector.sub(this.pos, this.origin).normalize().mult(strength);
    let pull = p5.Vector.sub(this.origin, this.pos).mult(0.05);
    this.vel.add(push).add(pull).mult(0.9);
    this.pos.add(this.vel);
  }

  display() {
    ellipse(this.pos.x, this.pos.y, 3, 3);
  }
}
