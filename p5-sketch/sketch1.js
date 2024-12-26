// A Buckyball consists of 60 vertices forming 12 pentagonal and 20 hexagonal faces.

// Adapted from the code from a dodecahedron from Coding Train
// https://editor.p5js.org/codingtrain/sketches/frIcGeI8l
let bucky;
// Click and drag the mouse to view the scene from different angles.

let myGeometry;

function setup() {
  createCanvas(600, 600, WEBGL);

  // Create a p5.Geometry object.
  myGeometry = new p5.Geometry();

 bucky = new Buckyball(20);
 let vertices = bucky.addVertices();
 //bucky.addFaces();
  // Add the vertices to myGeometry's vertices array.
  //myGeometry.vertices.push(v0, v1, v2, v3);
 for (let v of bucky.vert) {
  myGeometry.vertices.push(v);
  
 }
  //myGeometry.vertices = bucky.addVertices();

  // Compute myGeometry's faces array.
  console.log(myGeometry.vertices)
  myGeometry.computeFaces();
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

// function setup() {
//   createCanvas(640, 360, WEBGL);
//   bucky = new Buckyball(20);
//   bucky.addVertices();
//   bucky.addFaces();
// }

// function draw() {
//   background(0);
//   ambientLight(color(255));
//   translate(0, -20);

//   rotateY(frameCount * 0.001); // Continuous rotation on the Y axis
//   rotateX(-frameCount * 0.001); // Continuous rotation on the X axis

//   drawingContext.disable(drawingContext.DEPTH_TEST);
//   bucky.show();
//}
