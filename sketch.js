let doveImg;
let dots = [];           // Array to store main particles (dots)
let fireworkDots = [];   // Array to store firework particles
let state = "expanding"; // Animation state: expanding / contracting / waiting
let stateTimer = 0;      // Timer for controlling state transitions
let explosionStrength = 0; // Controls the intensity of expansion/contraction

function preload() {
  // Load the dove image before setup starts
  doveImg = loadImage("assets/dovefinal.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1); // Ensure consistent pixel density
  doveImg.resize(1000, 0); // Resize dove image to fixed width
  doveImg.loadPixels(); // Load pixel data for color checking

  let offsetX = (width - doveImg.width) / 2;
  let offsetY = (height - doveImg.height) / 2;

  // Loop through the dove image and create particles based on dark areas
  for (let y = 0; y < doveImg.height; y += 3) {
    for (let x = 0; x < doveImg.width; x += 3) {
      let i = (x + y * doveImg.width) * 4;
      let brightness = (doveImg.pixels[i] + doveImg.pixels[i + 1] + doveImg.pixels[i + 2]) / 3;
      if (brightness < 50) {
        let px = x + offsetX + random(-1.5, 1.5);
        let py = y + offsetY + random(-1.5, 1.5);
        dots.push(new Dot(px, py)); // Create a dot if the pixel is dark
      }
    }
  }

  noStroke();
}

function draw() {
  background(0); // Black background
  updateState(); // Update animation state

  // Update and display each dot
  for (let dot of dots) {
    dot.update(explosionStrength);
    dot.display();
  }

  // Update and display firework particles
  for (let i = fireworkDots.length - 1; i >= 0; i--) {
    fireworkDots[i].update();
    fireworkDots[i].display();
    if (fireworkDots[i].alpha <= 0) fireworkDots.splice(i, 1); // Remove faded dots
  }

  // Text prompt (you can delete this if not needed)
  fill(255);
  textSize(14);
  textAlign(CENTER, BOTTOM);
  text("Click to color • Double click for fireworks", width / 2, height - 20);
}

// Controls the three-phase animation cycle
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

// Class for each particle that forms the dove
class Dot {
  constructor(x, y) {
    this.origin = createVector(x, y);    // Initial target position
    this.pos = this.origin.copy();       // Current position
    this.vel = p5.Vector.random2D().mult(random(3)); // Random initial velocity
    this.size = createVector(random(3.5, 5), random(2, 3.5)); // Random size
    this.gray = random(80, 200);         // Gray tone
    this.defaultColor = color(this.gray);
    this.color = this.defaultColor;
    this.isColorful = false;             // Is temporarily colored
    this.colorLifespan = 0;              // Time before fading back to gray
  }

  update(strength) {
    // Particle moves away from origin (expansion)
    let push = p5.Vector.sub(this.pos, this.origin).normalize().mult(strength);
    // Particle is pulled back to origin (contraction)
    let pull = p5.Vector.sub(this.origin, this.pos).mult(0.05);
    this.vel.add(push).add(pull).mult(0.9);
    if (state === "waiting") {
      this.pos.add(p5.Vector.random2D().mult(0.3)); // Small jitter during waiting state
    }
    this.pos.add(this.vel);

    // Handle color fading if clicked
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

// Click to temporarily change color of nearby particles
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

// Double-click to trigger fireworks from dove shape
function doubleClicked() {
  let inside = dots.some(dot => dist(mouseX, mouseY, dot.pos.x, dot.pos.y) < 20);
  if (inside) {
    for (let i = 0; i < 30; i++) {
      let angle = random(TWO_PI);
      let speed = random(4, 8);
      fireworkDots.push(new FireworkDot(mouseX, mouseY, cos(angle) * speed, sin(angle) * speed));
    }
  }
}

// Firework particle class
class FireworkDot {
  constructor(x, y, vx, vy) {
    this.pos = createVector(x, y);
    this.vel = createVector(vx, vy);
    this.alpha = 255;
    this.color = random([
      color(255, 120, 120), color(255, 180, 80), color(255, 220, 100),
      color(120, 220, 255), color(180, 140, 255), color(120, 255, 180),
      color(255, 160, 200)
    ]);
    this.r = random(6, 10);
  }

  update() {
    this.pos.add(this.vel);
    this.vel.y += 0.1; // Gravity
    this.vel.mult(0.98); // Friction
    this.alpha -= 3; // Fade out
  }

  display() {
    fill(red(this.color), green(this.color), blue(this.color), this.alpha);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
  }
}
