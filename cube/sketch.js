// https://editor.p5js.org/kfahn/sketches/Mv6hd4wbo

let angle = 0;
let spritesheet;
let textures = [];
let s = 64; // Sprite size (64x64)

function preload() {
  spritesheet = loadImage("spritesheet.png");
}

function setup() {
  createCanvas(512, 512, WEBGL);
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

  // Rotate the cube
  rotateX(angle);
  rotateY(angle * 0.3);
  rotateZ(angle * 1.2);

  // Draw the cube with textures
  drawTexturedCube();

  angle += 0.01;
}

// Function to draw a textured cube
function drawTexturedCube() {
  let size = 150; // Cube size
  let faces = textures.slice(0, 6); // Use 6 textures (1 per face)
  textureMode(NORMAL);
  // Front face
  push();
  texture(faces[0]);
  //translate(0, 0, size / 2); // Move to center of front face
  translate(0, 0, size / 2); // Move to center of front face
  plane(size, size); // Draw a plane for the texture
  pop();

  // Back face
  push();
  texture(faces[1]);
  translate(0, 0, -size / 2); // Move to center of back face
  rotateY(PI); // Flip the plane to face outward
  plane(size, size);
  pop();

  // Right face
  push();
  // Add light from the image.

  texture(faces[2]);
  translate(size / 2, 0, 0); // Move to center of right face
  rotateY(HALF_PI); // Rotate plane to align with the right face
  plane(size, size);
  pop();

  // Left face
  push();
  texture(faces[3]);
  translate(-size / 2, 0, 0); // Move to center of left face
  rotateY(-HALF_PI); // Rotate plane to align with the left face
  plane(size, size);
  pop();

  // Top face
  push();
  texture(faces[4]);
  translate(0, -size / 2, 0); // Move to center of top face
  rotateX(-HALF_PI); // Rotate plane to align with the top face
  plane(size, size);
  pop();

  // Bottom face
  push();
  texture(faces[5]);
  translate(0, size / 2, 0); // Move to center of bottom face
  rotateX(HALF_PI); // Rotate plane to align with the bottom face
  plane(size, size);
  pop();
}
