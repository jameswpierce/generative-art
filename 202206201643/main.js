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
  frameRate(30);
  createCanvas(width, height);
  background(0);
  noStroke();
}

function draw() {
  clear();
  background(0);
  const { xOffset, yOffset } = shadowOffset();
  matrix.map((row, rI) => {
    row.map((col, cI) => {
      const x = rI * (width / matrix.length) + (width / matrix.length / 4);
      const y = cI * (height / matrix.length) + (height / matrix.length / 4);
      fill(255);
      square(x + xOffset, y + yOffset, 32);
      lSquare(x, y, 32 + (abs(rI - matrix.length / 2) + abs(cI - matrix.length / 2))).draw();
    });
  });
}

