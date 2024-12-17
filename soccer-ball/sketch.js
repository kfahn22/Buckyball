// A Buckyball consists of 60 vertices forming 12 pentagonal and 20 hexagonal faces.

// Adapted from the code from a dodecahedron from Coding Train
// https://editor.p5js.org/codingtrain/sketches/frIcGeI8l
let bucky;
let palettes = [];
let s = 64;

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

function setup() {
  createCanvas(512, 512, WEBGL);

  palette = generatePaletteArray(url);

  bucky = new Buckyball(20, palette);
  bucky.addVertices();
  bucky.addFaces();
}

function draw() {
  randomSeed(42);
  background(0);
  ambientLight(color(255));
  translate(0, -20);

  rotateY(frameCount * 0.001); // Continuous rotation on the Y axis
  rotateX(-frameCount * 0.001); // Continuous rotation on the X axis

  drawingContext.disable(drawingContext.DEPTH_TEST);
  bucky.show();
}

function mousePressed() {
  save("soccer.jpg");
}
