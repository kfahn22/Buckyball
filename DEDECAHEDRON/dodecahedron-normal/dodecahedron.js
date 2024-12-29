// From https://editor.p5js.org/codingtrain/sketches/frIcGeI8l

class Dodecahedron {
  constructor(r, palette, images) {
    this.palette = palette;
    this.images = images; // array of 12 sprites
    this.r = r;
    this.vert = [];
    this.faces = [];
  }

  addVertices() {
    // Define the vertices of a dodecahedron
    const A = (1 + sqrt(5)) / 2; // The golden ratio
    const B = 1 / A;
    this.vert.push(createVector(1, 1, 1));
    this.vert.push(createVector(1, 1, -1));
    this.vert.push(createVector(1, -1, 1));
    this.vert.push(createVector(1, -1, -1));
    this.vert.push(createVector(-1, 1, 1));
    this.vert.push(createVector(-1, 1, -1));
    this.vert.push(createVector(-1, -1, 1));
    this.vert.push(createVector(-1, -1, -1));
    this.vert.push(createVector(0, B, A));
    this.vert.push(createVector(0, B, -A));
    this.vert.push(createVector(0, -B, A));
    this.vert.push(createVector(0, -B, -A));
    this.vert.push(createVector(B, A, 0));
    this.vert.push(createVector(B, -A, 0));
    this.vert.push(createVector(-B, A, 0));
    this.vert.push(createVector(-B, -A, 0));
    this.vert.push(createVector(A, 0, B));
    this.vert.push(createVector(A, 0, -B));
    this.vert.push(createVector(-A, 0, B));
    this.vert.push(createVector(-A, 0, -B));

    // Scale factor to see the shape better
    let r = 50;
    // Scale all this.vertices
    this.vert.forEach((v) => v.mult(r));
  }

  addFaces() {
    // Define the faces using the vertex indices
    this.faces.push([0, 16, 2, 10, 8]);
    this.faces.push([0, 8, 4, 14, 12]);
    this.faces.push([16, 17, 1, 12, 0]);
    this.faces.push([1, 9, 11, 3, 17]);
    this.faces.push([1, 12, 14, 5, 9]);
    this.faces.push([2, 13, 15, 6, 10]);
    this.faces.push([13, 3, 17, 16, 2]);
    this.faces.push([3, 11, 7, 15, 13]);
    this.faces.push([4, 8, 10, 6, 18]);
    this.faces.push([14, 5, 19, 18, 4]);
    this.faces.push([5, 19, 7, 11, 9]);
    this.faces.push([15, 7, 19, 18, 6]);
  }
  getUV(v, face) {
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;

    for (let j = 0; j < face.length; j++) {
      let vertex = this.vert[face[j]];
      minX = min(minX, vertex.x);
      minY = min(minY, vertex.y);
      maxX = max(maxX, vertex.x);
      maxY = max(maxY, vertex.y);
    }

    let uCoord, vCoord;
    let cx = (minX + maxX) / 2;
    let cy = (minY + maxY) / 2;
    let angle = atan2(v.y - cy, v.x - cx);

    uCoord = 0.5 + 0.5 * cos(angle);
    vCoord = 0.5 + 0.5 * sin(angle);
    return createVector(uCoord, vCoord);
  }

  show() {
    strokeWeight(2);
    noStroke();

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

    //for (let i = 0; i < this.faces.length; i++) {
    for (let i = 0; i < 12; i++) {
      let face = this.faces[i];
      let centroid = this.calculateCentroid(face);
      let normal = this.calculateNormal(face);
      let sprite = this.images[i % this.images.length]; // Cycle through sprites
      // Draw sprite aligned to face
      this.drawSpriteOnFace(centroid, normal, sprite, i);
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
  drawSpriteOnFace(centroid, normal, sprite, i) {
    push();
    // Translate to the centroid of the face
    translate(centroid.x, centroid.y, centroid.z);

    // Align the sprite using the normal vector
    let zAxis = createVector(0, 0, 1);
    let axis = zAxis.cross(normal); // Axis of rotation
    let angle = acos(zAxis.dot(normal)); // Angle between vectors

    if (axis.mag() > 0.0001) rotate(angle, axis); // Avoid gimbal lock issues

    // Rotate around the face's local Z-axis for consistent orientation
    // Note aligned properly yet!!
    push();
    if (i == 0 || i == 6) {
      rotateZ(PI / 3);
    } else if (i == 1 || i == 7) {
      rotateZ((PI * 2) / 3);
    } else if (i == 3 || i == 9) {
      rotateZ((-PI * 1) / 3);
    } else if (i == 4 || 10) {
      rotateZ((PI * 1) / 3);
      // }  else if (i == 6) {
      //   rotateZ(PI * 1/3)
    }

    // Scale the sprite to match the face size
    let faceSize = 3.66 * this.r; // Adjust scaling as needed
    texture(sprite);
    plane(faceSize, faceSize);
    pop();
    pop();
  }
}
