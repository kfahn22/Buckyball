let spriteSheet;
let pattern;
let patterns = [];
let cols = 8; // Number of columns in the sprite sheet
let rows = 8; // Number of rows in the sprite sheet
// let cols = 4; // Number of columns in the sprite sheet
// let rows = 4; // Number of rows in the sprite sheet
let spriteSize;
let palette = [];

let url =
  "https://supercolorpalette.com/?scp=G0-hsl-49A9F3-5FA8F1-75AAF0-8AAFEF-9FB7EF-B2C0F0-C4CCF2-D6D9F5-E7E8F8";

let url1 =
  "https://supercolorpalette.com/?scp=G0-hsl-1FF8FF-2396FB-283CF6-6E2CF2-C131ED-E935C5-E43A78";

function extractHexCodes(url) {
  let startIndex = url.indexOf("=");
  let hexPart = url.substring(startIndex + 1);
  let parts = hexPart.split("-");
  return parts.filter((part) => /^[0-9A-Fa-f]{6}$/.test(part));
}

function hexToColor(hex, alpha) {
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  // let alpha = map(overlap, 0.25, 1.0, 50, 225);
  return color(r, g, b, alpha);
}

function generatePaletteArray(url, alpha) {
  let hexCodes = extractHexCodes(url);
  return hexCodes.map((hex) => hexToColor(hex, alpha));
}

let uniqueConfigs = new Set(); // Set to store unique pattern configurations

function setup() {
  createCanvas(512, 512);
  angleMode(DEGREES);
  spriteSize = width / cols;
  spriteSheet = createGraphics(width, height);

  // Create patterns with buffers
  for (let i = 0; i < cols * rows; i++) {
    let buffer = createGraphics(spriteSize, spriteSize); // Create buffer for the pattern
    let config;
    let n, overlap, depth;

    if (i < 12) {
      n = 5;
      overlap = 0.75;
      depth = 4;
    } else {
      n = 6;
      overlap = 0.75;
      depth = 4;
    }

    let a = map(overlap, 0.5, 1.0, 150, 225);
    palette = generatePaletteArray(url1, 220);

    pattern = new Pattern(buffer, n, overlap, palette); // Create a new pattern

    buffer.translate(spriteSize / 2, spriteSize * 0.5);
    if (i < 12) {
      push();
      //buffer.rotate(i * 180/n);
      buffer.rotate(60);
      pop();
    }
    let idx = int(random(palette.length));
    pattern.drawPattern(createVector(0, 0), spriteSize * 0.66, depth, idx);
  }

  patterns.push(pattern);

  // Draw patterns onto the sprite sheet
  spriteSheet.background(255);
  for (let i = 0; i < patterns.length; i++) {
    let x = (i % cols) * spriteSize;
    let y = int(i / cols) * spriteSize;

    patterns[i].show(); // Render the pattern onto its buffer

    spriteSheet.image(patterns[i].buffer, x, y); // Draw the buffer onto the sprite sheet
  }

  // Display the sprite sheet on the main canvas
  image(spriteSheet, 0, 0);
  saveCanvas(spriteSheet, "spritesheet", "png");
}

function draw() {
  noLoop();
}
