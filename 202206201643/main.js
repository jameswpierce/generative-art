const matrix = new Array(16).fill().map(a => new Array(16).fill());

function lSquare(x, y, size) {
  const hue = frameCount % 255;

  return {
    draw: () => {
      fill(hue, 64, 128);
      square(x, y, size);
    }
  }
}

function setup() {
  colorMode(HSB);
  frameRate(30);
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  noStroke();
}

function draw() {
  clear();
  background(0);
  matrix.map((row, rI) => {
    row.map((col, cI) => {
      const x = rI * 48 + window.innerWidth / 2 - (matrix.length * 24);
      const y = cI * 48 + window.innerHeight / 2 - (matrix.length * 24);
      fill(255);
      square(Math.sin(frameCount / 8) * 16 + x, Math.cos(frameCount / 8) * 16 + y, 32);
      lSquare(x, y, 32).draw();
    });
  });
}

