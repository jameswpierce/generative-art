const matrix = new Array(16).fill().map(a => new Array(16).fill());
const width = window.innerWidth;
const height = window.innerHeight;

function lSquare(x, y, size) {
  const hue = frameCount % 255;

  return {
    draw: () => {
      fill(hue, 64, 128);
      square(x, y, size);
    }
  }
}

function shadowOffset() {
  const xOffset = -((mouseX - (width / 2)) / 50);
  const yOffset = -((mouseY - (height / 2)) / 50);
  return {
    xOffset,
    yOffset
  }
}

function setup() {
  colorMode(HSB);
  frameRate(15);
  createCanvas(width, height);
  background(255);
  noStroke();
}

function draw() {
  clear();
  background(255);
  const { xOffset, yOffset } = shadowOffset();
  matrix.map((row, rI) => {
    row.map((col, cI) => {
      const x = rI * (width / matrix.length) + (width / matrix.length);
      const y = cI * (height / matrix.length) + (height / matrix.length);
      fill(0);
      const size = (width / matrix.length * 0.8) - (abs((matrix.length - rI) * ((frameCount % 150))) + abs((matrix.length - cI) * ((frameCount % 150))));
      square(x + xOffset, y + yOffset, size);
      lSquare(x, y, size).draw();
    });
  });
}

function windowResized() {
  resizeCanvas(width, height);
}
