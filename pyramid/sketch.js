// https://editor.p5js.org/kfahn/sketches/Mv6hd4wbo

// Sprites
//https://editor.p5js.org/kfahn/sketches/WeyaeTP1S

let angle = 0;
let spritesheet;
let textures = [];
let s = 256; // Sprite size (64x64)
let r = 256;
let pyramid;
let font;
let palette;

function preload() {
  spritesheet = loadImage("spritesheet1.png");
}

let url =
  "https://supercolorpalette.com/?scp=G0-hsl-1FF8FF-2396FB-283CF6-6E2CF2-C131ED-E935C5-E43A78";

function extractHexCodes(url) {
  let startIndex = url.indexOf("=");
  let hexPart = url.substring(startIndex + 1);
  let parts = hexPart.split("-");
  return parts.filter((part) => /^[0-9A-Fa-f]{6}$/.test(part));
}

function hexToColor(hex) {
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  return color(r, g, b, 230);
}

function generatePaletteArray(url) {
  let hexCodes = extractHexCodes(url);
  return hexCodes.map((hex) => hexToColor(hex));
}

function setup() {
  createCanvas(512, 512, WEBGL);
  background(0);
  palette = generatePaletteArray(url);

  noStroke(); // Avoid outlines interfering with textures

  // Extract sprites from the spritesheet
  for (let y = 0; y < spritesheet.height; y += s) {
    for (let x = 0; x < spritesheet.width; x += s) {
      let img = spritesheet.get(x, y, s, s);
      textures.push(img);
    }
  }
}

function draw() {
  background(175);

  // Rotate the pyramid
  rotateX(angle);
  rotateY(angle * 0.01);
  rotateZ(angle * 0.01);

  // Draw the pyramid with textures
  drawTexturedPyramid();

  angle += 0.01;
}

// Function to draw a textured pyramid
function drawTexturedPyramid() {
  let baseSize = r; // Base size
  let height = r * 2/3;//(s * 4) / 3; // Pyramid height
  let halfBase = baseSize / 2;
  let triBase = baseSize / 3;

  textureMode(NORMAL);
  let faces = textures.slice(0, 5); 

  // Draw the base (square face)
  push();
  rotate(PI / 4);
  beginShape();
  vertex(-triBase, triBase, 0, 0, 1);
  vertex(triBase, triBase, 0, 1, 1);
  vertex(triBase, -triBase, 0, 1, 0);
  vertex(-triBase, -triBase, 0, 0, 0);
  endShape(CLOSE);
  pop();

  // Draw the 4 triangular faces
  for (let i = 0; i < 5; i++) {
    push();
    texture(faces[i]); // Side texture
    beginShape();
    vertex(0, 0, -height, 0.5, 0); // Pyramid tip
    let angle1 = TWO_PI * (i / 4);
    let angle2 = TWO_PI * ((i + 1) / 4);
    vertex(halfBase * cos(angle1), halfBase * sin(angle1), 0, 0.0, 1.0); // Base corner 1
    vertex(halfBase * cos(angle2), halfBase * sin(angle2), 0, 1.0, 1.0); // Base corner 2
    endShape(CLOSE);
    pop();
  }
}

// Calculate the centroid of a face
function calculateCentroid(face) {
  let sum = createVector(0, 0, 0);
  for (let j = 0; j < face.length; j++) {
    let v = this.vert[face[j]];
    sum.add(v);
  }
  return sum.div(face.length); // Average of face vertices
}
