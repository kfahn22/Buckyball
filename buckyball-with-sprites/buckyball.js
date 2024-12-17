class Buckyball {
  constructor(r, palette, images) {
    this.palette = palette;
    this.images = images; // array of 32 sprites
    this.r = r;
    this.vert = [];
    this.faces = [];
  }

  // Vertices from https://www.goldennumber.net/bucky-balls/
  addVertices() {
    let phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
    this.vert.push(createVector(0, 1, 3 * phi));
    this.vert.push(createVector(0, 1, -3 * phi));
    this.vert.push(createVector(0, -1, 3 * phi));
    this.vert.push(createVector(0, -1, -3 * phi));
    this.vert.push(createVector(1, 3 * phi, 0));
    this.vert.push(createVector(1, -3 * phi, 0));
    this.vert.push(createVector(-1, 3 * phi, 0));
    this.vert.push(createVector(-1, -3 * phi, 0));
    this.vert.push(createVector(3 * phi, 0, 1));
    this.vert.push(createVector(3 * phi, 0, -1));
    this.vert.push(createVector(-3 * phi, 0, 1));
    this.vert.push(createVector(-3 * phi, 0, -1));
    this.vert.push(createVector(2, 1 + 2 * phi, phi));
    this.vert.push(createVector(2, 1 + 2 * phi, -phi));
    this.vert.push(createVector(2, -(1 + 2 * phi), phi));
    this.vert.push(createVector(2, -(1 + 2 * phi), -phi));
    this.vert.push(createVector(-2, 1 + 2 * phi, phi));
    this.vert.push(createVector(-2, 1 + 2 * phi, -phi));
    this.vert.push(createVector(-2, -(1 + 2 * phi), phi));
    this.vert.push(createVector(-2, -(1 + 2 * phi), -phi));
    this.vert.push(createVector(1 + 2 * phi, phi, 2));
    this.vert.push(createVector(1 + 2 * phi, phi, -2));
    this.vert.push(createVector(1 + 2 * phi, -phi, 2));
    this.vert.push(createVector(1 + 2 * phi, -phi, -2));
    this.vert.push(createVector(-(1 + 2 * phi), phi, 2));
    this.vert.push(createVector(-(1 + 2 * phi), phi, -2));
    this.vert.push(createVector(-(1 + 2 * phi), -phi, 2));
    this.vert.push(createVector(-(1 + 2 * phi), -phi, -2));
    this.vert.push(createVector(phi, 2, 1 + 2 * phi));
    this.vert.push(createVector(phi, 2, -(1 + 2 * phi)));
    this.vert.push(createVector(phi, -2, 1 + 2 * phi));
    this.vert.push(createVector(phi, -2, -(1 + 2 * phi)));
    this.vert.push(createVector(-phi, 2, 1 + 2 * phi));
    this.vert.push(createVector(-phi, 2, -(1 + 2 * phi)));
    this.vert.push(createVector(-phi, -2, 1 + 2 * phi));
    this.vert.push(createVector(-phi, -2, -(1 + 2 * phi)));
    this.vert.push(createVector(1, 2 + phi, 2 * phi));
    this.vert.push(createVector(1, 2 + phi, -2 * phi));
    this.vert.push(createVector(1, -(2 + phi), 2 * phi));
    this.vert.push(createVector(1, -(2 + phi), -2 * phi));
    this.vert.push(createVector(-1, 2 + phi, 2 * phi));
    this.vert.push(createVector(-1, 2 + phi, -2 * phi));
    this.vert.push(createVector(-1, -(2 + phi), 2 * phi));
    this.vert.push(createVector(-1, -(2 + phi), -2 * phi));
    this.vert.push(createVector(2 + phi, 2 * phi, 1));
    this.vert.push(createVector(2 + phi, 2 * phi, -1));
    this.vert.push(createVector(2 + phi, -2 * phi, 1));
    this.vert.push(createVector(2 + phi, -2 * phi, -1));
    this.vert.push(createVector(-(2 + phi), 2 * phi, 1));
    this.vert.push(createVector(-(2 + phi), 2 * phi, -1));
    this.vert.push(createVector(-(2 + phi), -2 * phi, 1));
    this.vert.push(createVector(-(2 + phi), -2 * phi, -1));
    this.vert.push(createVector(2 * phi, 1, 2 + phi));
    this.vert.push(createVector(2 * phi, 1, -(2 + phi)));
    this.vert.push(createVector(2 * phi, -1, 2 + phi));
    this.vert.push(createVector(2 * phi, -1, -(2 + phi)));
    this.vert.push(createVector(-2 * phi, 1, 2 + phi));
    this.vert.push(createVector(-2 * phi, 1, -(2 + phi)));
    this.vert.push(createVector(-2 * phi, -1, 2 + phi));
    this.vert.push(createVector(-2 * phi, -1, -(2 + phi)));
    this.vert.forEach((v) => v.mult(this.r));
  }

  // Add faces to the buckyball
  addFaces() {
    // Pentagon faces
    this.faces.push([42, 38, 30, 2, 34]);
    this.faces.push([16, 6, 17, 49, 48]);
    this.faces.push([0, 28, 36, 40, 32]);
    this.faces.push([1, 29, 37, 41, 33]);
    this.faces.push([27, 59, 57, 25, 11]);
    this.faces.push([52, 54, 22, 8, 20]);
    this.faces.push([12, 44, 45, 13, 4]);
    this.faces.push([26, 58, 56, 24, 10]);
    this.faces.push([39, 31, 3, 35, 43]);
    this.faces.push([55, 23, 9, 21, 53]);
    this.faces.push([47, 46, 14, 5, 15]);
    this.faces.push([19, 7, 18, 50, 51]);

    // Hexagon faces
    this.faces.push([0, 2, 34, 58, 56, 32]);
    this.faces.push([0, 2, 30, 54, 52, 28]);
    this.faces.push([1, 3, 31, 55, 53, 29]);
    this.faces.push([1, 3, 35, 59, 57, 33]);
    this.faces.push([4, 6, 16, 40, 36, 12]);
    this.faces.push([4, 6, 17, 41, 37, 13]);
    this.faces.push([5, 7, 19, 43, 39, 15]);
    this.faces.push([5, 14, 38, 42, 18, 7]);
    this.faces.push([8, 9, 21, 45, 44, 20]);
    this.faces.push([8, 22, 46, 47, 23, 9]);
    this.faces.push([10, 11, 25, 49, 48, 24]);
    this.faces.push([10, 11, 27, 51, 50, 26]);
    this.faces.push([13, 37, 29, 53, 21, 45]);
    this.faces.push([14, 38, 30, 54, 22, 46]);
    this.faces.push([16, 40, 32, 56, 24, 48]);
    this.faces.push([18, 42, 34, 58, 26, 50]);
    this.faces.push([19, 43, 35, 59, 27, 51]);
    this.faces.push([12, 44, 20, 52, 28, 36]);
    this.faces.push([15, 47, 23, 55, 31, 39]);
    this.faces.push([17, 49, 25, 57, 33, 41]);
  }

  // Draw the buckyball
  show() {
    // buckeyball
    strokeWeight(2);
    //stroke(255);
    noStroke();

    //fill(255, 200);
    for (let i = 0; i < this.faces.length; i++) {
      fill(this.palette[i % this.palette.length]);
      beginShape();
      for (let j = 0; j < this.faces[i].length; j++) {
        let v = this.vert[this.faces[i][j]];
        vertex(v.x, v.y, v.z);
      }
      endShape(CLOSE);
    }

    // Helper functions from chatGPT to add sprites to buckyball faces

    for (let i = 0; i < this.faces.length; i++) {
      let face = this.faces[i];
      let centroid = this.calculateCentroid(face);
      let normal = this.calculateNormal(face);
      let sprite = this.images[i % this.images.length]; // Cycle through sprites
      // Draw sprite aligned to face
      this.drawSpriteOnFace(centroid, normal, sprite);
    }
  }

  // Calculate the centroid of a face
  calculateCentroid(face) {
    let sum = createVector(0, 0, 0);
    for (let j = 0; j < face.length; j++) {
      let v = this.vert[face[j]];
      sum.add(v);
    }
    return sum.div(face.length); // Average of face vertices
  }

  // Calculate the normal of a face
  calculateNormal(face) {
    let v0 = this.vert[face[0]];
    let v1 = this.vert[face[1]];
    let v2 = this.vert[face[2]];
    let edge1 = p5.Vector.sub(v1, v0);
    let edge2 = p5.Vector.sub(v2, v0);
    return edge1.cross(edge2).normalize(); // Perpendicular vector
  }

  // Draw a sprite on a face
  drawSpriteOnFace(centroid, normal, sprite) {
    push();
    // Translate to the centroid of the face
    translate(centroid.x, centroid.y, centroid.z);

    // Align the sprite using the normal vector
    let zAxis = createVector(0, 0, 1);
    let axis = zAxis.cross(normal); // Axis of rotation
    let angle = acos(zAxis.dot(normal)); // Angle between vectors
    if (axis.mag() > 0) rotate(angle, axis);

    // Apply the sprite as a texture
    texture(sprite);
    plane(2 * this.r); // Adjust plane size as needed
    pop();
  }
}
