// https://editor.p5js.org/kfahn/sketches/Mv6hd4wbo

// Sprites
//https://editor.p5js.org/kfahn/sketches/WeyaeTP1S

let angle = 0;
let spritesheet;
let textures = [];
let s = 512; // Sprite size (64x64)
let r = 128;
let pyramid;
let font;
let palette;

function preload() {
  spritesheet = loadImage("spritesheet.png");
  font = loadFont("Facile-Sans.otf");
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

  //noStroke(); // Avoid outlines interfering with textures

  // Extract sprites from the spritesheet
  for (let y = 0; y < spritesheet.height; y += s) {
    for (let x = 0; x < spritesheet.width; x += s) {
      let img = spritesheet.get(x, y, s, s);
      textures.push(img);
    }
  }
  let sprites = textures.slice(0, 5); // Use 5
  pyramid = new Pyramid(r, sprites, font, palette);
  pyramid.addVertices();
  pyramid.addFaces();
}

function draw() {
  randomSeed(42);
  background(0);
  ambientLight(color(255));
  translate(0, -20);

  // Rotate the pyramid
  rotateX(angle);
  rotateY(angle * 0.01);
  rotateZ(angle * 0.01);

  textureMode(NORMAL)

  drawingContext.disable(drawingContext.DEPTH_TEST);
  pyramid.show();
  angle += 0.01;
}