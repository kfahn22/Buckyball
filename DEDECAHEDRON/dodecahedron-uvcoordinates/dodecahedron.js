// Adapted from https://editor.p5js.org/codingtrain/sketches/frIcGeI8l

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
    //let r = 50;
    // Scale all this.vertices
    this.vert.forEach((v) => v.mult(this.r));
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

  // Find the bounding box for each pentagon
  findBoundingBox(face) {
    let minX = Infinity,
      maxX = -Infinity,
      minY = Infinity,
      maxY = -Infinity,
      minZ = Infinity,
      maxZ = -Infinity;
    for (let j = 0; j < face.length; j++) {
      let vertex = this.vert[face[j]];
      minX = min(minX, vertex.x);
      maxX = max(maxX, vertex.x);
      minY = min(minY, vertex.y);
      maxY = max(maxY, vertex.y);
      minZ = min(minZ, vertex.z);
      maxZ = max(maxZ, vertex.z);
    }
    return [minX, maxX, minY, maxY, minZ, maxZ];
  }

  // Use bounding box to find uv coordinates
  getUV(v, bounds) {
    let [minX, maxX, minY, maxY] = bounds;

    let uCoord, vCoord;
    uCoord = map(v.x, minX, maxX, 0, 1);
    vCoord = map(v.y, minY, maxY, 0, 1);
    return createVector(uCoord, vCoord);
  }

  show() {
    let xz = [2, 6, 7, 9, 11];
    stroke(this.palette[0]);
    strokeWeight(2);
    for (let i = 0; i < this.faces.length; i++) {
      // Apply the texture
      let sprite = this.images[i % this.images.length]; // Cycle through sprites
      texture(sprite);
      let uv;

      // Draw the face
      beginShape();
      for (let j = 0; j < this.faces[i].length; j++) {
        let v = this.vert[this.faces[i][j]];
        let [minX, maxX, minY, maxY, minZ, maxZ] = this.findBoundingBox(
          this.faces[i]
        );

        // Need to change the coordinate system to (x, z) for bounding box for these faces
        if (xz.includes(i)) {
          let newV = createVector(v.x, v.z);
          let bounds = [minX, maxX, minZ, maxZ];
          uv = this.getUV(newV, bounds);
        } else {
          let newV = createVector(v.x, v.y);
          let bounds = [minX, maxX, minY, maxY];
          uv = this.getUV(newV, bounds);
        }

        // let newV = createVector(v.x, v.y);
        // let bounds = [minX, maxX, minY, maxY];
        // uv = this.getUV(newV, bounds);

        vertex(v.x, v.y, v.z, uv.x, uv.y); // Map vertex with UVs
      }
      endShape(CLOSE);
    }
  }
}
