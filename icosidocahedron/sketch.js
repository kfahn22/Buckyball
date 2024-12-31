// 32 faces, 30 vertices, and 60 edges
// https://en.wikipedia.org/wiki/Icosidodecahedron

// Adapted from the code from a dodecahedron from Coding Train
// https://editor.p5js.org/codingtrain/sketches/frIcGeI8l
let icos;
let font;

function preload() {
  font = loadFont("Cubano.ttf");
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
  return color(r, g, b, 255);
}

function generatePaletteArray(url) {
  let hexCodes = extractHexCodes(url);
  return hexCodes.map((hex) => hexToColor(hex));
}

function setup() {
  createCanvas(640, 360, WEBGL);

  palette = generatePaletteArray(url);

  icos = new Icosidodecahedron(40, font, palette);
  icos.addVertices();
  icos.addFaces();
}

function draw() {
  background(0);
  ambientLight(color(255));
  translate(0, -20);
  //orbitControl(); // Allows mouse rotation

  rotateY(frameCount * 0.001); // Continuous rotation on the Y axis
  rotateX(-frameCount * 0.001); // Continuous rotation on the X axis

  //drawingContext.disable(drawingContext.DEPTH_TEST);
  //icos.showVert();
  icos.show();
}

// function mousePressed() {
//   save("icos.jpg");
// }
