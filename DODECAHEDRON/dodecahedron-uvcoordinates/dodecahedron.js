// Adapted from https://editor.p5js.org/codingtrain/sketches/frIcGeI8l

class Dodecahedron {
  constructor(r, palette, images) {
    this.palette = palette;
    this.images = images; // array of 12 sprites
    this.r = r;
    this.vert = [];
    this.faces = [];
    this.uvCoords = [];
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
    //let r = 50;
    // Scale all this.vertices
    this.vert.forEach((v) => v.mult(this.r));
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

  computeBasisVectors(face) {
    let v0 = this.vert[face[0]];
    let v1 = this.vert[face[1]];
    let tangent = p5.Vector.sub(v1, v0).normalize(); // X-axis
    let normal = p5.Vector.cross(
      tangent,
      p5.Vector.sub(this.vert[face[2]], v0)
    ).normalize();
    let bitangent = p5.Vector.cross(normal, tangent).normalize(); // Y-axis
    return [tangent, bitangent];
  }

  getUV(face) {
    // UV Mapping: Project vertices onto the tangent-bitangent plane
    let centroid = this.calculateCentroid(face);
    let [tangent, bitangent] = this.computeBasisVectors(face);
    let scale = this.r; // Scale UVs based on radius for consistency
    let uCoord, vCoord;
    for (let j = 0; j < face.length; j++) {
      let v = this.vert[face[j]];
      let relative = p5.Vector.sub(v, centroid); // Local coordinates

      // Project to 2D plane
      uCoord = 0.5 + (0.5 * p5.Vector.dot(relative, tangent)) / scale; // Normalize to [0, 1]
      vCoord = 0.5 + (0.5 * p5.Vector.dot(relative, bitangent)) / scale;
      this.uvCoords.push(createVector(1 - uCoord, 1 - vCoord));
    }
  }

  // I got some help from chatGPT for this function
  show() {
    stroke(this.palette[4]);
    strokeWeight(2);

    for (let i = 0; i < this.faces.length; i++) {
      let face = this.faces[i];

      // Apply the texture
      let sprite = this.images[i % this.images.length];
      texture(sprite);

      // Get uv coordinates
      this.getUV(face);

      // Draw the face with proper UVs
      beginShape();
      for (let j = 0; j < face.length; j++) {
        let v = this.vert[face[j]];
        let uv = this.uvCoords[j];
        vertex(v.x, v.y, v.z, uv.x, uv.y);
      }
      endShape(CLOSE);
    }
  }
}
