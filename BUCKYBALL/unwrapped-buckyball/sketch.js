// https://www.mathopenref.com/apothem.html

let hexSize = 45; // radius, length of side for hexagon
let pentSize = hexSize; // radius, length of side for pentagon
let pentagonR;
let hexApothem;
let pentApothem;
let angles = [30, 90, 150, 210, 270, 330]; // Neighbor rotations
let palettes = [];

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
  createCanvas(800, 800);
  background(255);

  // Generate a color palette
  palettes = generatePaletteArray(url);

  stroke(random(palettes));
  let centerX = width / 2;
  let centerY = height / 2;
  pentagonR = hexSize / (2 * sin(radians(36))); // pentagon radius

  hexApothem = (sqrt(3) / 2) * hexSize;
  pentApothem = pentSize / (2 * tan(radians(36)));

  push();
  translate(centerX, centerY);
  rotate(-PI / 3);
  // Draw central hexagon
  polygon(0, 0, hexSize, 6, 60);

  // Surrounding hexagons and pentagons
  for (let i = 0; i < angles.length; i++) {
    if (i % 2 == 0) {
      // Draw hexagons
      push(); // 1
      let pos = move(0, 0, 2 * hexApothem, angles[i]);
      push(); // 2
      translate(pos.x, pos.y);
      polygon(0, 0, hexSize, 6, 60);
      // translate
      pos = move(0, 0, hexApothem + pentApothem, angles[i]);
      drawPentagonDoubleHexagon(i, pos);
      pop(); //2
      pop(); // 1
    } else {
      //Draw pentagons
      let pos = move(0, 0, hexApothem + pentApothem, angles[i]);
      drawPentagonDoubleHexagon(i, pos);
    }
  }
  pop();
}

// Move to new position based on angle
function move(x, y, distance, angle) {
  let rad = radians(angle);
  return createVector(x + distance * cos(rad), y + distance * sin(rad));
}

function polygon(x, y, r, n, a) {
  fill(random(palettes));
  beginShape();
  for (let i = 0; i < n; i++) {
    // 5 pentagon, 6 hexagon
    let angle = radians(a * i); // 72 pentagon, 60 hexagon
    let vx = x + r * cos(angle);
    let vy = y + r * sin(angle);
    vertex(vx, vy);
  }
  endShape(CLOSE);
}

function drawPentHex(x, y, angle, hexApothem, pentApothem) {
  drawPentagon(0, 0, pentagonR);
  push();
  let pos = move(0, 0, hexApothem + pentApothem, 90);
  translate(pos.x, pos.y);
  rotate((TWO_PI * 3.25) / 5);
  drawPentagon(0, 0, pentagonR); // ??
  pop();
}

// Draw a hexagon and pentagon
function hexPent(x, y, angle, hexApothem, pentApothem) {
  polygon(x, y, hexSize, 6, 60); // draw hexagon
  push();
  let pos = move(0, 0, hexApothem + pentApothem, PI / 3);
  translate(pos.x, pos.y);
  polygon(0, 0, pentagonR, 5, 72); // draw pentagon
  pop();
}

// Push to new position, rotate shape and draw either pentagon or hexagon
function drawShape(x, y, angle, shape) {
  push(); // 1
  translate(x, y);
  push(); // 2
  rotate(angle);
  if (shape == "hexagon") {
    polygon(0, 0, hexSize, 6, 60);
  } else {
    polygon(0, 0, pentagonR, 5, 72);
  }
  pop(); //2
  pop(); //1
}

function drawPentagonDoubleHexagon(i, pos) {
  push(); // 1
  push(); // 2
  translate(pos.x, pos.y);
  rotate(PI / 6 + (i * PI) / 3);
  polygon(0, 0, pentagonR, 5, 72);
  let outwardPos = move(0, 0, hexApothem + pentApothem, 36);
  drawShape(outwardPos.x, outwardPos.y, TWO_PI / 5.5, "hexagon");
  // Left side of pentagon draw hexagon with pentagon
  outwardPos = move(0, 0, hexApothem + pentApothem, -36);
  drawShape(outwardPos.x, outwardPos.y, -TWO_PI / 5.5, "hexagon");
  push(); // 3
  outwardPos = move(outwardPos.x, outwardPos.y, hexApothem + pentApothem, 24);
  drawShape(outwardPos.x, outwardPos.y, radians(24), "pentagon");
  if (i == 1) {
    outwardPos = move(
      outwardPos.x,
      outwardPos.y,
      hexApothem + pentApothem,
      -12
    );
    push(); // 4
    drawShape(outwardPos.x, outwardPos.y, radians(18), "hexagon");
    push(); // 5
    outwardPos = move(outwardPos.x, outwardPos.y, 2 * hexApothem, -12);
    drawShape(outwardPos.x, outwardPos.y, radians(18), "hexagon");
    pop(); // 5
    pop(); // 4
  }
  pop(); // 3
  pop(); //2
  pop(); //1
}

function mousePressed() {
  save("texture.png");
}
