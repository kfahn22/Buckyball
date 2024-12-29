// A Buckyball consists of 60 vertices forming 12 pentagonal and 20 hexagonal faces.

// Adapted from the code from a dodecahedron from Coding Train
// https://editor.p5js.org/codingtrain/sketches/frIcGeI8l
let bucky;

function setup() {
  createCanvas(640, 360, WEBGL);
  bucky = new Buckyball(20);
  bucky.addVertices();
  bucky.addFaces();
}

function draw() {
  background(0);
  ambientLight(color(255));
  translate(0, -20);

  rotateY(frameCount * 0.001); // Continuous rotation on the Y axis
  rotateX(-frameCount * 0.001); // Continuous rotation on the X axis

  drawingContext.disable(drawingContext.DEPTH_TEST);
  bucky.show();
}
