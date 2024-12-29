class Pyramid {
  constructor(r, sprites, font, palette) {
    this.r = r;
    this.sprites = sprites;
    this.font = font;
    this.vert = [];
    this.faces = [];
    this.palette = palette;
  }

  addVertices() {
    // The last two numbers in the array are the uv coordinates
    this.vert.push([0, 0, -1, 0.5, 0]);
    this.vert.push([1, 0, 0, 0, 1]);
    this.vert.push([0, 1, 0, 1, 1]);
    this.vert.push([-1, 0, 0, 0, 1]);
    this.vert.push([0, -1, 0, 1, 1]);
    for (let j = 0; j < this.vert.length; j++) {
      for (let i = 0; i < 3; i++) {
        this.vert[j][i] *= this.r;
      }
    }
  }

  addFaces() {
    this.faces.push([1, 2, 3, 4]);
    this.faces.push([0, 2, 1]);
    this.faces.push([0, 4, 1]);
    this.faces.push([0, 2, 3]);
    this.faces.push([0, 3, 4]);
  }

  show() {
    // To label vertices if desired
    // for (let i = 0; i < 5; i++) {
    //   stroke(255);
    //   textFont(this.font);
    //   strokeWeight(8);
    //   let v = this.vert[i];
    //   push();
    //   translate(v[0], v[1], v[2]);
    //   text(i, 0, 0, 0); // Show the index at the vertex position
    //   sphere(10);
    //   pop();
    // }

    // For solid color
    noStroke();
    for (let i = 0; i < 5; i++) {
      
      push();
      if (i == 0)
      {fill(this.palette[i % this.palette.length]);
      beginShape();
      for (let j = 0; j < this.faces[i].length; j++) {
        let v = this.vert[this.faces[i][j]];
        // v[3], v[4] are texture coordinates
        vertex(v[0], v[1], v[2], v[3], v[4]);
      }
      endShape(CLOSE);}
      else {
        let sprite = this.sprites[i % this.sprites.length];
        texture(sprite);
        beginShape();
        for (let j = 0; j < this.faces[i].length; j++) {
          let v = this.vert[this.faces[i][j]];
          // v[3], v[4] are texture coordinates
          vertex(v[0], v[1], v[2], v[3], v[4]);
        }
        endShape(CLOSE);
      }
      pop();

    //   for (let i = 0; i < 1; i++) {
    //     push();
    //     fill(this.palette[i % this.palette.length]);
    //     beginShape();
    //     for (let j = 0; j < this.faces[i].length; j++) {
    //       let v = this.vert[this.faces[i][j]];
    //       // v[3], v[4] are texture coordinates
    //       vertex(v[0], v[1], v[2], v[3], v[4]);
    //     }
    //     endShape(CLOSE);
    //     pop();
    //   }
    }
  }
}
