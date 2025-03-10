// Adapted from the code from a dodecahedron from Daniel Shiffman
// https://editor.p5js.org/codingtrain/sketches/frIcGeI8l

// The spritesheet was generated using this sketch https://editor.p5js.org/kfahn/sketches/Mv6hd4wbo

let dodecahedron;

let spritesheet;
let textures = [];
let palette = [];
let s = 128;
//let s = 64; for number.png

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
  return color(r, g, b, 200);
}

function generatePaletteArray(url) {
  let hexCodes = extractHexCodes(url);
  return hexCodes.map((hex) => hexToColor(hex));
}

function preload() {
  spritesheet = loadImage("images.jpg");
  //spritesheet = loadImage("numbers.png");
}

function setup() {
  createCanvas(512, 512, WEBGL);
  textureMode(NORMAL); // Enable UV coordinates

  // Generate a color palette
  palette = generatePaletteArray(url);
  // stroke(random(palette));

  // Extract sprites from the spritesheet
  for (let y = 0; y < spritesheet.height; y += s) {
    for (let x = 0; x < spritesheet.width; x += s) {
      let img = spritesheet.get(x, y, s, s);
      textures.push(img);
    }
  }

  let faces = textures.slice(0, 12);
  dodecahedron = new Dodecahedron(100, palette, faces);
  dodecahedron.addVertices();
  dodecahedron.addFaces();
}

function draw() {
  background(59);
  ambientLight(color(255));
  translate(0, -20);
  //orbitControl();

  rotateY(frameCount * 0.01); // Continuous rotation on the Y axis
  rotateX(-frameCount * 0.01); // Continuous rotation on the X axis

  dodecahedron.show();
}

// function mousePressed() {
//   save("doddy.jpg");
// }
