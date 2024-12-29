class Buckyball {
  constructor(r, images, font) {
    this.r = r;
    this.images = images; // array of index numbers
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

  getUV(v, face, type) {
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

    if (type === "pentagon") {
      let cx = (minX + maxX) / 2;
      let cy = (minY + maxY) / 2;
      let angle = atan2(v.y - cy, v.x - cx);

      uCoord = 0.5 + 0.5 * cos(angle);
      vCoord = 0.5 + 0.5 * sin(angle);
    } else {
      // Default rectangle mapping for hexagons
      // uCoord = map(v.x, minX, maxX, 0, 1);
      // vCoord = map(v.y, minY, maxY, 0, 1);

      let centroid = this.calculateCentroid(face);
      let dx = v.x - centroid.x;
      let dy = v.y - centroid.y;
      let dz = v.z - centroid.z;
      let d = sqrt(dx * dx + dy * dy + dz * dz);

      uCoord = map(v.x / d, minX, maxX, 0, 1);
      vCoord = map(v.y / d, minY, maxY, 0, 1);

      // uCoord = constrain(dx / d, 0, 1);
      // vCoord = constrain(dy / d, 0, 1);
    }

    return createVector(uCoord, vCoord);
  }

  getUV(v, face, type) {
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

    if (type === "pentagon") {
      let cx = (minX + maxX) / 2;
      let cy = (minY + maxY) / 2;
      let angle = atan2(v.y - cy, v.x - cx);

      uCoord = 0.5 + 0.5 * cos(angle);
      vCoord = 0.5 + 0.5 * sin(angle);
    } else {
      // Default rectangle mapping for hexagons
      uCoord = map(v.x, minX, maxX, 0, 1);
      vCoord = map(v.y, minY, maxY, 0, 1);
    }

    return createVector(uCoord, vCoord);
  }
  getUV15(v, face, type) {
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

    if (type === "pentagon") {
      let cx = (minX + maxX) / 2;
      let cy = (minY + maxY) / 2;
      let angle = atan2(v.y - cy, v.x - cx);

      uCoord = 0.5 + 0.5 * cos(angle);
      vCoord = 0.5 + 0.5 * sin(angle);
    } else {
      // Default rectangle mapping for hexagons
      vCoord = map(v.x, minX, maxX, 0, 1);
      uCoord = map(v.y, minY, maxY, 0, 1);
    }

    return createVector(uCoord, vCoord);
  }

  // getUV_XZ(v, face, type) {
  //   let minX = Infinity,
  //     minZ = Infinity,
  //     maxX = -Infinity,
  //     maxZ = -Infinity;

  //   for (let j = 0; j < face.length; j++) {
  //     let vertex = this.vert[face[j]];
  //     minX = min(minX, vertex.x);
  //     minZ = min(minZ, vertex.z);
  //     maxX = max(maxX, vertex.x);
  //     maxZ = max(maxZ, vertex.z);
  //   }

  //   let uCoord, vCoord;

  //   if (type === "pentagon") {
  //     // Normalize to fit inside a circular UV mapping
  //     let radius = dist(minX, minZ, maxX, maxZ) / 2;
  //     let cx = (minX + maxX) / 2;
  //     let cz = (minZ + maxZ) / 2;
  //     let angle = atan2(v.z - cz, v.x - cx);

  //     uCoord = 0.5 + 0.5 * cos(angle);
  //     vCoord = 0.5 + 0.5 * sin(angle);
  //   } else {
  //     uCoord = map(v.x, minX, maxX, 0, 1);
  //     vCoord = map(v.z, minZ, maxZ, 0, 1);
  //   }

  //   return createVector(uCoord, vCoord);
  // }

  getUV24(v, face, type) {
    let minX = Infinity,
      minY = Infinity,
      minZ = Infinity,
      maxX = -Infinity,
      maxY = -Infinity,
      maxZ = -Infinity;

    for (let j = 0; j < face.length; j++) {
      let vertex = this.vert[face[j]];
      minX = min(minX, vertex.x);
      minY = min(minY, vertex.y);
      minZ = min(minZ, vertex.z);
      maxX = max(maxX, vertex.x);
      maxY = max(maxY, vertex.y);
      maxZ = max(maxZ, vertex.z);
    }

    let uCoord, vCoord;
    let minXY = (minX + minY) / 2;
    let maxXY = (maxX + maxY) / 2;
    let minXZ = (minX + minZ) / 2;
    let maxXZ = (maxX + maxZ) / 2;
    let minYZ = (minY + minZ) / 2;
    let maxYZ = (maxY + maxZ) / 2;
    if (type === "pentagon") {
      // Normalize to fit inside a circular UV mapping
      let radius = dist(minX, minZ, maxX, maxZ) / 2;
      let cx = (minX + maxX) / 2;
      let cy = (minY + maxY) / 2;
      let cxy = (cx + cy) / 2;
      let cz = (minZ + maxZ) / 2;
      let angle = atan2(v.z - cz, v.y - cy);

      uCoord = 0.5 + 0.5 * cos(angle);
      vCoord = 0.5 + 0.5 * sin(angle);
    } else {
      let vxy = (v.x + v.y) / 2;
      let vxz = (v.x + v.z) / 2;
      let vyz = (v.y + v.z) / 2;
      uCoord = map(vyz, minYZ, maxYZ, 0, 1);
      vCoord = map(v.x, minX, maxX, 0, 1);
    }

    return createVector(uCoord, vCoord);
  }

  getUV25(v, face, type) {
    let minX = Infinity,
      minY = Infinity,
      minZ = Infinity,
      maxX = -Infinity,
      maxY = -Infinity,
      maxZ = -Infinity;

    for (let j = 0; j < face.length; j++) {
      let vertex = this.vert[face[j]];
      minX = min(minX, vertex.x);
      minY = min(minY, vertex.y);
      minZ = min(minZ, vertex.z);
      maxX = max(maxX, vertex.x);
      maxY = max(maxY, vertex.y);
      maxZ = max(maxZ, vertex.z);
    }

    let uCoord, vCoord;
    let minXY = (minX + minY) / 2;
    let maxXY = (maxX + maxY) / 2;
    let minXZ = (minX + minZ) / 2;
    let maxXZ = (maxX + maxZ) / 2;
    let minYZ = (minY + minZ) / 2;
    let maxYZ = (maxY + maxZ) / 2;
    if (type === "pentagon") {
      // Normalize to fit inside a circular UV mapping
      let radius = dist(minX, minZ, maxX, maxZ) / 2;
      let cx = (minX + maxX) / 2;
      let cy = (minY + maxY) / 2;
      let cxy = (cx + cy) / 2;
      let cz = (minZ + maxZ) / 2;
      let angle = atan2(v.z - cz, v.y - cy);

      uCoord = 0.5 + 0.5 * cos(angle);
      vCoord = 0.5 + 0.5 * sin(angle);
    } else {
      let vxy = (v.x + v.y) / 2;
      let vxz = (v.x + v.z) / 2;
      let vyz = (v.y + v.z) / 2;
      // uCoord = map(1 - vxy, minXY, maxXY, 0, 1);
      // vCoord = map(v.z, minZ, maxZ, 0, 1);
      uCoord = map(1 - vyz, minYZ, maxYZ, 0, 1); // 25
      //  uCoord = map(1-vyz, minYZ, maxYZ, 0, 1); // 25
      vCoord = map(v.x, minX, maxX, 0, 1);
    }

    return createVector(uCoord, vCoord);
  }
  getUV26(v, face, type) {
    let minX = Infinity,
      minY = Infinity,
      minZ = Infinity,
      maxX = -Infinity,
      maxY = -Infinity,
      maxZ = -Infinity;

    for (let j = 0; j < face.length; j++) {
      let vertex = this.vert[face[j]];
      minX = min(minX, vertex.x);
      minY = min(minY, vertex.y);
      minZ = min(minZ, vertex.z);
      maxX = max(maxX, vertex.x);
      maxY = max(maxY, vertex.y);
      maxZ = max(maxZ, vertex.z);
    }

    let uCoord, vCoord;

    if (type === "pentagon") {
      // Normalize to fit inside a circular UV mapping
      let radius = dist(minX, minZ, maxX, maxZ) / 2;
      let cx = (minX + maxX) / 2;
      let cy = (minY + maxY) / 2;
      let cxy = (cx + cy) / 2;
      let cz = (minZ + maxZ) / 2;
      let angle = atan2(v.z - cz, v.y - cy);

      uCoord = 0.5 + 0.5 * cos(angle);
      vCoord = 0.5 + 0.5 * sin(angle);
    } else {
      let minXY = (minX + minY) / 2;
      let maxXY = (maxX + maxY) / 2;
      let vxy = (v.x + v.y) / 2;
      // uCoord = map(1 - vxy, minXY, maxXY, 0, 1); // 26
      // vCoord = map(v.z, minZ, maxZ, 0, 1);
      uCoord = map(v.z, minZ, maxZ, 0, 1);
      vCoord = map(vxy, minXY, maxXY, 0, 1);
    }

    return createVector(uCoord, vCoord);
  }

  getUV27(v, face, type) {
    let minX = Infinity,
      minY = Infinity,
      minZ = Infinity,
      maxX = -Infinity,
      maxY = -Infinity,
      maxZ = -Infinity;

    for (let j = 0; j < face.length; j++) {
      let vertex = this.vert[face[j]];
      minX = min(minX, vertex.x);
      minY = min(minY, vertex.y);
      minZ = min(minZ, vertex.z);
      maxX = max(maxX, vertex.x);
      maxY = max(maxY, vertex.y);
      maxZ = max(maxZ, vertex.z);
    }

    let uCoord, vCoord;
    let minXY = (minX + minY) / 2;
    let maxXY = (maxX + maxY) / 2;
    let minXZ = (minX + minZ) / 2;
    let maxXZ = (maxX + maxZ) / 2;
    let minYZ = (minY + minZ) / 2;
    let maxYZ = (maxY + maxZ) / 2;
    if (type === "pentagon") {
      // Normalize to fit inside a circular UV mapping
      let radius = dist(minX, minZ, maxX, maxZ) / 2;
      let cx = (minX + maxX) / 2;
      let cy = (minY + maxY) / 2;
      let cxy = (cx + cy) / 2;
      let cz = (minZ + maxZ) / 2;
      let angle = atan2(v.z - cz, v.y - cy);

      uCoord = 0.5 + 0.5 * cos(angle);
      vCoord = 0.5 + 0.5 * sin(angle);
    } else {
      let vxy = (v.x + v.y) / 2;
      let vxz = (v.x + v.z) / 2;
      let vyz = (v.y + v.z) / 2;
      // uCoord = map(1 - vxy, minXY, maxXY, 0, 1);
      // vCoord = map(v.z, minZ, maxZ, 0, 1);
      uCoord = map(vxz, minXZ, maxXZ, 0, 1);
      vCoord = map(v.y, minY, maxY, 0, 1);
    }

    return createVector(uCoord, vCoord);
  }
  getUV28(v, face, type) {
    let minX = Infinity,
      minY = Infinity,
      minZ = Infinity,
      maxX = -Infinity,
      maxY = -Infinity,
      maxZ = -Infinity;

    for (let j = 0; j < face.length; j++) {
      let vertex = this.vert[face[j]];
      minX = min(minX, vertex.x);
      minY = min(minY, vertex.y);
      minZ = min(minZ, vertex.z);
      maxX = max(maxX, vertex.x);
      maxY = max(maxY, vertex.y);
      maxZ = max(maxZ, vertex.z);
    }

    let uCoord, vCoord;
    let minXY = (minX + minY) / 2;
    let maxXY = (maxX + maxY) / 2;
    let minXZ = (minX + minZ) / 2;
    let maxXZ = (maxX + maxZ) / 2;
    let minYZ = (minY + minZ) / 2;
    let maxYZ = (maxY + maxZ) / 2;
    if (type === "pentagon") {
      // Normalize to fit inside a circular UV mapping
      let radius = dist(minX, minZ, maxX, maxZ) / 2;
      let cx = (minX + maxX) / 2;
      let cy = (minY + maxY) / 2;
      let cxy = (cx + cy) / 2;
      let cz = (minZ + maxZ) / 2;
      let angle = atan2(v.z - cz, v.y - cy);

      uCoord = 0.5 + 0.5 * cos(angle);
      vCoord = 0.5 + 0.5 * sin(angle);
    } else {
      let vxy = (v.x + v.y) / 2;
      let vxz = (v.x + v.z) / 2;
      let vyz = (v.y + v.z) / 2;
      // uCoord = map(v.xz, minXZ, maxXZ, 0, 1);
      // vCoord = map(v.y, minY, maxY, 0, 1);
      //  uCoord = map(v.y, minY, maxY, 0, 1);
      //  vCoord = map(v.z, minZ, maxZ, 0, 1);
      uCoord = map(vyz, minYZ, maxYZ, 0, 1);
      vCoord = map(vxy, minXY, maxXY, 0, 1);
      //vCoord = map(vxz, minXZ, maxXZ, 0, 1);
    }

    return createVector(uCoord, vCoord);
  }
  getUV29(v, face, type) {
    let minX = Infinity,
      minY = Infinity,
      minZ = Infinity,
      maxX = -Infinity,
      maxY = -Infinity,
      maxZ = -Infinity;

    for (let j = 0; j < face.length; j++) {
      let vertex = this.vert[face[j]];
      minX = min(minX, vertex.x);
      minY = min(minY, vertex.y);
      minZ = min(minZ, vertex.z);
      maxX = max(maxX, vertex.x);
      maxY = max(maxY, vertex.y);
      maxZ = max(maxZ, vertex.z);
    }

    let uCoord, vCoord;
    let minXY = (minX + minY) / 2;
    let maxXY = (maxX + maxY) / 2;
    let minXZ = (minX + minZ) / 2;
    let maxXZ = (maxX + maxZ) / 2;
    let minYZ = (minY + minZ) / 2;
    let maxYZ = (maxY + maxZ) / 2;
    if (type === "pentagon") {
      // Normalize to fit inside a circular UV mapping
      let radius = dist(minX, minZ, maxX, maxZ) / 2;
      let cx = (minX + maxX) / 2;
      let cy = (minY + maxY) / 2;
      let cxy = (cx + cy) / 2;
      let cz = (minZ + maxZ) / 2;
      let angle = atan2(v.z - cz, v.y - cy);

      uCoord = 0.5 + 0.5 * cos(angle);
      vCoord = 0.5 + 0.5 * sin(angle);
    } else {
      let vxy = (v.x + v.y) / 2;
      let vxz = (v.x + v.z) / 2;
      let vyz = (v.y + v.z) / 2;
      //vCoord = map(v.xz, minXZ, maxXZ, 0, 1);
      vCoord = map(v.y, minY, maxY, 0, 1);
      //  uCoord = map(v.y, minY, maxY, 0, 1);
     //vCoord = map(v.x, minX, maxX, 0, 1);
     // vCoord = map(v.z, minZ, maxZ, 0, 1);
      uCoord = map(vxy, minXY, maxXY, 0, 1);
      //uCoord = map(vxz, minXZ, maxXZ, 0, 1);
    }

    return createVector(uCoord, vCoord);
  }

  // For faces 1, 6, 10, 11, 20-23
  getUV_XZ(v, face, type) {
    let minX = Infinity,
      minZ = Infinity,
      maxX = -Infinity,
      maxZ = -Infinity;

    for (let j = 0; j < face.length; j++) {
      let vertex = this.vert[face[j]];
      minX = min(minX, vertex.x);
      minZ = min(minZ, vertex.z);
      maxX = max(maxX, vertex.x);
      maxZ = max(maxZ, vertex.z);
    }

    let uCoord, vCoord;

    if (type === "pentagon") {
      // Normalize to fit inside a circular UV mapping
      let radius = dist(minX, minZ, maxX, maxZ) / 2;
      let cx = (minX + maxX) / 2;
      let cz = (minZ + maxZ) / 2;
      let angle = atan2(v.z - cz, v.x - cx);

      uCoord = 0.5 + 0.5 * cos(angle);
      vCoord = 0.5 + 0.5 * sin(angle);
    } else {
      uCoord = map(v.x, minX, maxX, 0, 1);
      vCoord = map(v.z, minZ, maxZ, 0, 1);
    }

    return createVector(uCoord, vCoord);
  }

  // getUV_YZ(v, face, type) {
  //   let minX = Infinity,
  //     minY = Infinity,
  //     minZ = Infinity,
  //     maxX = -Infinity,
  //     maxY = -Infinity,
  //     maxZ = -Infinity;

  //   for (let j = 0; j < face.length; j++) {
  //     let vertex = this.vert[face[j]];
  //     minX = min(minX, vertex.x);
  //     minY = min(minY, vertex.y);
  //     minZ = min(minZ, vertex.z);
  //     maxX = max(maxX, vertex.x);
  //     maxY = max(maxY, vertex.y);
  //     maxZ = max(maxZ, vertex.z);
  //   }

  //   let uCoord, vCoord;

  //   if (type === "pentagon") {
  //     // Normalize to fit inside a circular UV mapping
  //     let radius = dist(minX, minZ, maxX, maxZ) / 2;
  //     let cx = (minX + maxX) / 2;
  //     let cy = (minY + maxY) / 2;
  //     let cxy = (cx + cy) / 2;
  //     let cz = (minZ + maxZ) / 2;
  //     let angle = atan2(v.z - cz, v.y - cy);

  //     uCoord = 0.5 + 0.5 * cos(angle);
  //     vCoord = 0.5 + 0.5 * sin(angle);
  //   } else {
  //      let minXY = (minX + minY) / 2;
  //      let maxXY = (maxX + maxY) / 2;
  //      let vxy = (v.x + v.y) / 2
  //     // uCoord = map(v.y, minY, maxY, 0, 1);
  //       uCoord = map(vxy, minXY, maxXY, 0, 1);
  //      vCoord = map(v.z, minZ, maxZ, 0, 1);
  //     // uCoord = map(v.x, minX, maxX, 0, 1);
  //     // vCoord = map(v.z, minZ, maxZ, 0, 1);
  //   }

  //   return createVector(uCoord, vCoord);
  // }

  show() {
    let centroid;
    // 24, 25, 26, 27, 28, 29, 31
    let yz = [26]; // skewed
    for (let i = 0; i < this.faces.length; i++) {
      // Apply the texture
      let sprite = this.images[i % this.images.length]; // Cycle through sprites
      sprite.wrapS = REPEAT;
      sprite.wrapT = REPEAT;

      sprite.filter = LINEAR; // Smoother texture filtering
      texture(sprite); // Apply texture

      // Draw the face
      beginShape();

      for (let j = 0; j < this.faces[i].length; j++) {
        centroid = this.calculateCentroid(this.faces[i]);
        let v = this.vert[this.faces[i][j]];

        // Determine UV mapping
        let type = this.faces[i].length === 5 ? "pentagon" : "hexagon";
        let uv;
        let xz = [1, 6, 10, 11, 20, 21, 22, 23]; // display as lines

        if (xz.includes(i)) {
          uv = this.getUV_XZ(v, this.faces[i], type);
          vertex(v.x, v.y, v.z, uv.x, uv.y);
        } else if (i == 15) {
          uv = this.getUV15(v, this.faces[i], type);
        } else if (i == 24) {
          uv = this.getUV24(v, this.faces[i], type);
        } else if (i == 25) {
          uv = this.getUV25(v, this.faces[i], type);
        } else if (i == 26) {
          uv = this.getUV26(v, this.faces[i], type);
        } else if (i == 27) {
          uv = this.getUV27(v, this.faces[i], type);
          //  } else if (i == 29) {
          // uv = this.getUV29(v, this.faces[i], type);
          //   } else if (i == 28) {
          // uv = this.getUV28(v, this.faces[i], type);
        } else {
          uv = this.getUV(v, this.faces[i], type);
        }

        vertex(v.x, v.y, v.z, uv.x, uv.y); // Map vertex with UVs
      }
      endShape(CLOSE);
    }
  }
}
