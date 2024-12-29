// Click and drag the mouse to view the scene from different angles.

let myGeometry;

function setup() {
  createCanvas(512,512, WEBGL);

  // Create a p5.Geometry object.
  myGeometry = new p5.Geometry();

//   // Create p5.Vector objects to position the vertices.
  let v0 = createVector(-40, 0, 0);
  let v1 = createVector(0, -40, 0);
  let v2 = createVector(0, 40, 0);
  let v3 = createVector(40, 0, 0);
  // Add the vertices to myGeometry's vertices array.
  myGeometry.vertices.push(v0, v1, v2, v3);

  // Compute myGeometry's faces array.
  myGeometry.computeFaces();

  describe("A red square drawn on a gray background.");
}

function draw() {
  background(200);

  // Enable orbiting with the mouse.
  orbitControl();

  // Turn on the lights.
  lights();

  // Style the shape.
  noStroke();
  fill(255, 0, 0);

  // Draw the p5.Geometry object.
  model(myGeometry);
}
