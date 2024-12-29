class Buckyball {
  constructor(r, palette, images, font) {
    this.r = r;
    this.images = images;
    this.palette = palette;
    this.font = font;
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
    this.vert.push(createVector(1, -3 * phi, 0)); // 5
    this.vert.push(createVector(-1, 3 * phi, 0));
    this.vert.push(createVector(-1, -3 * phi, 0));
    this.vert.push(createVector(3 * phi, 0, 1));
    this.vert.push(createVector(3 * phi, 0, -1));
    this.vert.push(createVector(-3 * phi, 0, 1)); //10
    this.vert.push(createVector(-3 * phi, 0, -1));
    this.vert.push(createVector(2, 1 + 2 * phi, phi));
    this.vert.push(createVector(2, 1 + 2 * phi, -phi));
    this.vert.push(createVector(2, -(1 + 2 * phi), phi));
    this.vert.push(createVector(2, -(1 + 2 * phi), -phi)); // 15
    this.vert.push(createVector(-2, 1 + 2 * phi, phi));
    this.vert.push(createVector(-2, 1 + 2 * phi, -phi));
    this.vert.push(createVector(-2, -(1 + 2 * phi), phi));
    this.vert.push(createVector(-2, -(1 + 2 * phi), -phi));
    this.vert.push(createVector(1 + 2 * phi, phi, 2)); //20
    this.vert.push(createVector(1 + 2 * phi, phi, -2));
    this.vert.push(createVector(1 + 2 * phi, -phi, 2));
    this.vert.push(createVector(1 + 2 * phi, -phi, -2));
    this.vert.push(createVector(-(1 + 2 * phi), phi, 2));
    this.vert.push(createVector(-(1 + 2 * phi), phi, -2)); //25
    this.vert.push(createVector(-(1 + 2 * phi), -phi, 2)); // 26
    this.vert.push(createVector(-(1 + 2 * phi), -phi, -2));
    this.vert.push(createVector(phi, 2, 1 + 2 * phi));
    this.vert.push(createVector(phi, 2, -(1 + 2 * phi)));
    this.vert.push(createVector(phi, -2, 1 + 2 * phi)); //30
    this.vert.push(createVector(phi, -2, -(1 + 2 * phi)));
    this.vert.push(createVector(-phi, 2, 1 + 2 * phi));
    this.vert.push(createVector(-phi, 2, -(1 + 2 * phi)));
    this.vert.push(createVector(-phi, -2, 1 + 2 * phi));
    this.vert.push(createVector(-phi, -2, -(1 + 2 * phi))); // 35
    this.vert.push(createVector(1, 2 + phi, 2 * phi));
    this.vert.push(createVector(1, 2 + phi, -2 * phi));
    this.vert.push(createVector(1, -(2 + phi), 2 * phi));
    this.vert.push(createVector(1, -(2 + phi), -2 * phi));
    this.vert.push(createVector(-1, 2 + phi, 2 * phi)); //40
    this.vert.push(createVector(-1, 2 + phi, -2 * phi));
    this.vert.push(createVector(-1, -(2 + phi), 2 * phi));
    this.vert.push(createVector(-1, -(2 + phi), -2 * phi));
    this.vert.push(createVector(2 + phi, 2 * phi, 1));
    this.vert.push(createVector(2 + phi, 2 * phi, -1)); //45
    this.vert.push(createVector(2 + phi, -2 * phi, 1));
    this.vert.push(createVector(2 + phi, -2 * phi, -1));
    this.vert.push(createVector(-(2 + phi), 2 * phi, 1)); //48
    this.vert.push(createVector(-(2 + phi), 2 * phi, -1));
    this.vert.push(createVector(-(2 + phi), -2 * phi, 1)); //50
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

  addFaces() {
    // Pentagon faces
    this.faces.push([42, 38, 30, 2, 34]);
    this.faces.push([16, 6, 17, 49, 48]); // 1
    this.faces.push([0, 28, 36, 40, 32]);
    this.faces.push([1, 29, 37, 41, 33]);
    this.faces.push([27, 59, 57, 25, 11]);
    this.faces.push([52, 54, 22, 8, 20]);
    this.faces.push([12, 44, 45, 13, 4]); // 6
    this.faces.push([26, 58, 56, 24, 10]);
    this.faces.push([39, 31, 3, 35, 43]);
    this.faces.push([55, 23, 9, 21, 53]);
    this.faces.push([47, 46, 14, 5, 15]); // 10
    this.faces.push([19, 7, 18, 50, 51]); // 11

    // Hexagon faces
    this.faces.push([0, 2, 34, 58, 56, 32]);
    this.faces.push([0, 2, 30, 54, 52, 28]);
    this.faces.push([1, 3, 31, 55, 53, 29]);
    this.faces.push([1, 3, 35, 59, 57, 33]);
    this.faces.push([4, 6, 16, 40, 36, 12]);
    this.faces.push([4, 6, 17, 41, 37, 13]);
    this.faces.push([5, 7, 19, 43, 39, 15]);
    this.faces.push([5, 14, 38, 42, 18, 7]);
    this.faces.push([8, 9, 21, 45, 44, 20]); //20
    this.faces.push([8, 22, 46, 47, 23, 9]); //21
    this.faces.push([10, 11, 25, 49, 48, 24]); //22
    this.faces.push([10, 11, 27, 51, 50, 26]); //23
    this.faces.push([13, 37, 29, 53, 21, 45]); // 24
    this.faces.push([14, 38, 30, 54, 22, 46]); // 25
    this.faces.push([16, 40, 32, 56, 24, 48]); //26 skewed
    this.faces.push([18, 42, 34, 58, 26, 50]);
    this.faces.push([19, 43, 35, 59, 27, 51]);
    this.faces.push([12, 44, 20, 52, 28, 36]);
    this.faces.push([15, 47, 23, 55, 31, 39]);
    this.faces.push([17, 49, 25, 57, 33, 41]);
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

  avgBoundingBox(face) {
    let [minX, maxX, minY, maxY, minZ, maxZ] = this.findBoundingBox(face);
    let minXY = (minX + minY) / 2;
    let maxXY = (maxX + maxY) / 2;
    let minXZ = (minX + minZ) / 2;
    let maxXZ = (maxX + maxZ) / 2;
    let minYZ = (minY + minZ) / 2;
    let maxYZ = (maxY + maxZ) / 2;

    return [minXY, maxXY, minXZ, maxXZ, minYZ, maxYZ];
  }

  avergeVertex(v) {
    let vxy = (v.x + v.y) / 2;
    let vxz = (v.x + v.z) / 2;
    let vyz = (v.y + v.z) / 2;
    return createVector(vxy, vxz, vyz);
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
    let xz = [1, 6, 10, 11, 20, 21, 22, 23];
    strokeWeight(2);
    stroke(this.palette[0]);
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
        let [minXY, maxXY, minXZ, maxXZ, minYZ, maxYZ] = this.avgBoundingBox(
          this.faces[i]
        );

        // Need to change the coordinate system to (x, z) for bounding box for these faces
        if (xz.includes(i)) {
          let newV = createVector(v.x, v.z);
          let bounds = [minX, maxX, minZ, maxZ];
          uv = this.getUV(newV, bounds);

          // createVector(vxy, vxz, vyz)
        } else if (i == 24) {
          let avgV = this.avergeVertex(v);
          let newV = createVector(avgV.z, v.x);
          let bounds = [minYZ, maxYZ, minX, maxX];
          uv = this.getUV(newV, bounds);
        } else if (i == 25) {
          let avgV = this.avergeVertex(v);
          let newV = createVector(1 - avgV.z, v.x);
          let bounds = [minYZ, maxYZ, minX, maxX];
          uv = this.getUV(newV, bounds);
        } else if (i == 26) {
          let avgV = this.avergeVertex(v);
          let newV = createVector(v.z, avgV.x);
          let bounds = [minZ, maxZ, minXY, maxXY];
          uv = this.getUV(newV, bounds);
        } else if (i == 27) {
          let avgV = this.avergeVertex(v);
          let newV = createVector(avgV.y, v.y);
          let bounds = [minXZ, maxXZ, minY, maxY];
          uv = this.getUV(newV, bounds);
          //let xz = [1, 6, 10, 11, 20, 21, 22, 23];
          // } else if (i == 29) {
          //   let avgV = this.avergeVertex(v);
          //   let newV = createVector(v.y, v.x);
          //   let bounds = [minY, maxY, minX, maxX];
          //   uv = this.getUV(newV, bounds);
        } else {
          let newV = createVector(v.x, v.y);
          let bounds = [minX, maxX, minY, maxY];
          uv = this.getUV(newV, bounds);
        }
        vertex(v.x, v.y, v.z, uv.x, uv.y);

        // this.displayFaceIndex(i, this.faces[i]);
      }
      endShape(CLOSE);
    }
  }

  displayFaceIndex(i, face) {
    // Calculate and display face index
    let centroid = this.calculateCentroid(face);
    push();
    translate(centroid.x + 30, centroid.y, centroid.z + 20);
    fill(0);
    stroke(0);
    textSize(50);
    textFont(this.font);
    textAlign(CENTER, CENTER);
    text(i, 0, 0, 0); // Display the face index
    pop();
  }
}
