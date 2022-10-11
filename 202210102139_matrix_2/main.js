let width = window.innerWidth;
let height = window.innerHeight;
let ff = 0.0025;

function generateStacks(length) {
  return Array(length)
    .fill()
    .map((a, index) =>
      Array.from({ length }, () => Array.from({ length }, () => Math.round(Math.random() * (0.5 + ff))))
    );
}

function mutateStacks(stacks) {
  return stacks.map((layer, layerIndex) => {
    return layer.map((row, rowIndex) => {
      return row.map((block, blockIndex) => {
        if (layerIndex > 0 && stacks[layerIndex - 1][rowIndex][blockIndex] == 1) {
          return 1;
        } else {
          return block;
        }
      })
    }) 
  })
}

let stacks;

function generate() {
  stacks = generateStacks(64);

  for (let index = 0; index < stacks.length; index++) {
    stacks = mutateStacks(stacks);
  }
}

generate();

function setup() {
  colorMode(HSB);
  createCanvas(width, height, WEBGL);
  ortho(-width / 2, width / 2, height / 2, -height / 2, 0, 1024);
  resizeCanvas(width, height);
}

function draw() {
  clear();
  background(255);
  stroke(255, 255, 100);
  rotateX(.325 * PI);
  translate(
    (stacks.length / 2) * 12,
    (stacks.length / 2) * 12,
    -((stacks.length / 2) * 12)
  );
  generate();
  stacks.map((row, i) => {
    translate(0, -12 * row.length, 12);
    fill(180 -(20 * i / row.length), 360 - (i / row.length * 360), 255, 0.75);
    row.map((column, j) => {
      translate(-12 * column.length, 12, 0);
      column.map((block, k) => {
        translate(12, 0, 0);
        if (block) {
          box(12);
        }
      })
    })
  })
}
