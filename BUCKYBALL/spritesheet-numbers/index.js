class IndexNumber {
  constructor(buffer, i, font) {
    this.buffer = buffer;
    this.i = i; // index number
    this.font = font;
    //this.ctr = createVector(width / 2, height / 2);
  }

  // show() {
  //   for (let i = 0; i < this.quads.length; i++) {
  //     this.buffer.angleMode(DEGREES);
  //     this.buffer.noStroke();
  //     this.buffer.fill(this.quads[i].color);
  //     this.buffer.push();
  //     // pentagon - 60
  //     //this.buffer.rotate(30);
  //     this.buffer.beginShape();
  //     // for (let p of this.quads[i].points) {
  //     //   this.buffer.vertex(p.x, p.y);
  //     // }
  //     this.buffer.endShape(CLOSE);
  //     this.buffer.pop();
  //   }
  // }

  show() {
    this.buffer.push();
    this.buffer.fill(0);
    this.buffer.stroke(0);
    this.buffer.textSize(20);
    this.buffer.textFont(this.font);
    // //textSize(20); // Adjust size for visibility
    this.buffer.textAlign(CENTER, CENTER);
    this.buffer.text(this.i, 0, 0, 0); // Display the face index
    this.buffer.pop();
  }
}
