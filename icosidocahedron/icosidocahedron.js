// 32 faces, 30 vertices, and 60 edges
// https://en.wikipedia.org/wiki/Icosidodecahedron
// https://en.wikipedia.org/wiki/Golden_rectangle

// From THE ICOSIDODECAHEDRON (https://arxiv.org/pdf/2309.15774)
// A golden box is the 3d analogue of a golden rectangle: its three sides are in the proportions φ, 1 and Φ. It is well-known that the vertices of an octahedron
// and the golden boxes, taken together in this way, are the vertices of an icosidodecahedron:

class Icosidodecahedron {
  constructor(r, font, palette) {
    this.r = r;
    this.font = font;
    this.palette = palette;
    this.vert = [];
    this.faces = [];
  }

  addVertices() {
    let phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
    this.vert.push(createVector(2 * phi, 0, 0));
    this.vert.push(createVector(-2 * phi, 0, 0));
    this.vert.push(createVector(0, 2 * phi, 0));
    this.vert.push(createVector(0, -2 * phi, 0));
    this.vert.push(createVector(0, 0, 2 * phi));
    this.vert.push(createVector(0, 0, -2 * phi));
    this.vert.push(createVector(phi, 1, pow(phi, 2)));
    this.vert.push(createVector(phi, 1, -pow(phi, 2)));
    this.vert.push(createVector(phi, -1, pow(phi, 2)));
    this.vert.push(createVector(phi, -1, -pow(phi, 2)));
    this.vert.push(createVector(-phi, 1, pow(phi, 2))); // 10
    this.vert.push(createVector(-phi, 1, -pow(phi, 2))); // 11
    this.vert.push(createVector(-phi, -1, -pow(phi, 2)));
    this.vert.push(createVector(1, pow(phi, 2), phi));
    this.vert.push(createVector(1, -pow(phi, 2), -phi)); // 13
    this.vert.push(createVector(1, pow(phi, 2), -phi));
    this.vert.push(createVector(1, -pow(phi, 2), phi));
    this.vert.push(createVector(-1, -pow(phi, 2), -phi));
    this.vert.push(createVector(-1, pow(phi, 2), -phi));
    this.vert.push(createVector(-1, -pow(phi, 2), phi));
    this.vert.push(createVector(-1, pow(phi, 2), phi));
    this.vert.push(createVector(pow(phi, 2), phi, 1));
    this.vert.push(createVector(pow(phi, 2), phi, -1));
    this.vert.push(createVector(pow(phi, 2), -phi, 1));
    this.vert.push(createVector(pow(phi, 2), -phi, -1));
    this.vert.push(createVector(-pow(phi, 2), phi, 1));
    this.vert.push(createVector(-pow(phi, 2), phi, -1));
    this.vert.push(createVector(-pow(phi, 2), -phi, 1));
    this.vert.push(createVector(-pow(phi, 2), -phi, -1));
    this.vert.push(createVector(-phi, -1, pow(phi, 2)));

    this.vert.forEach((v) => v.mult(this.r));
  }

  addFaces() {
    this.faces.push([4, 6, 8]);
    this.faces.push([3, 16, 19]);
    this.faces.push([3, 14, 17]);
    this.faces.push([8, 16, 23]);
    this.faces.push([0, 22, 21]);
    this.faces.push([0, 23, 24]);
    this.faces.push([1, 25, 26]);
    this.faces.push([1, 27, 28]);
    this.faces.push([2, 13, 20]);
    this.faces.push([2, 15, 18]);
    this.faces.push([5, 11, 12]);
    this.faces.push([5, 7, 9]);
    this.faces.push([6, 21, 13]);
    this.faces.push([9, 14, 24]);
    this.faces.push([10, 20, 25]);
    this.faces.push([11, 18, 26]);
    this.faces.push([12, 17, 28]);
    this.faces.push([15, 22, 7]);
    this.faces.push([10, 4, 29]);
    this.faces.push([19, 29, 27]);

    this.faces.push([0, 23, 8, 6, 21]);
    this.faces.push([2, 15, 22, 21, 13]);
    this.faces.push([2, 20, 25, 26, 18]);
    this.faces.push([3, 14, 24, 23, 16]);
    this.faces.push([3, 19, 27, 28, 17]);
    this.faces.push([4, 6, 13, 20, 10]);
    this.faces.push([5, 7, 15, 18, 11]);
    this.faces.push([5, 9, 14, 17, 12]);
    this.faces.push([7, 9, 24, 0, 22]);
    this.faces.push([29, 27, 1, 25, 10]);
    this.faces.push([11, 26, 1, 28, 12]);
    this.faces.push([29, 4, 8, 16, 19]);
  }
  // Helper function to figure out faces
  // showVert() {
  //   noStroke();
  //   fill(200, 100, 255);
  //   for (let i = 0; i < this.vert.length; i++) {
  //     let v = this.vert[i];
  //     push();
  //     translate(v.x, v.y, v.z);
  //     sphere(2);
  //     pop();
  //   }

  //   // Display vertex indices
  //   fill(255, 0, 0);
  //   textFont(this.font);
  //   textSize(20);
  //   for (let i = 0; i < this.vert.length; i++) {
  //     let v = this.vert[i];
  //     push();
  //     translate(v.x, v.y, v.z);
  //     text(i, 0, 20, 0);
  //     pop();
  //   }
  // }

  show() {
    strokeWeight(3);
    stroke(this.palette[4]);
    // fill(255, 100);
    for (let i = 0; i < this.faces.length; i++) {
      beginShape();
      for (let j = 0; j < this.faces[i].length; j++) {
        if (this.faces[i]. length == 3) {
          let c = this.palette[0];
          //c[3] = 200;
          fill(c);
        } else {
          let c = this.palette[2];
         //c[3] = 200;
          fill(c);
        }
        let v = this.vert[this.faces[i][j]];
        vertex(v.x, v.y, v.z);
      }
      endShape(CLOSE);
    }
  }
}
