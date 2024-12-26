# Buckyball in p5.js

A buckyball (aka truncated icosahedron) is a shape with 60 vertices, 12 pentagonal, and 20 hexagonal faces. I adapted Daniel Shiffman's [code](https://editor.p5js.org/codingtrain/sketches/frIcGeI8l) for rendering a dodecahedron to render the buckyball. I found the vertices for the buckyball at [The Golden Number](https://www.goldennumber.net/bucky-balls/), which is a great place to learn more about the buckyball and its relation to the golden ratio. I tried to find the faces/adjacency matrices, but the ones I found online didn't seem to match up with the vertices. Eventually, I just plotted the vertices with their index numbers and figured them out myself. It was fairly straight forward adapting Daniel's code with the vertices and faces in hand. You can check out the code [here](https://editor.p5js.org/kfahn/full/KlWlmtOU9).

<p align="center"><img src="assets/bucky.jpg" alt="Buckyball" width="800px"></p>

The plain vanilla buckyball is pretty cool, but can we take it up a notch. It is not to hard to add color to the faces, creating a "soccer" ball like effect.

<p align="center"><img src="assets/soccer.jpg" alt="Buckyball" width="800px"></p>

  We can also render some recursive patterns on the faces of the buckyball. I started out with a simpler problem, rendering patterns on a cube from a stritesheet I generated using this [code](https://editor.p5js.org/kfahn/sketches/Mv6hd4wbo). Although p5.js has a box() function, the same sprite renders on all of the faces. We can render a unique sprite on each face by building a custom cube using the the plane() function. Suppose you had a white cube and you wanted to add stickers to each of the faces. You would rotate the cube and then center the sticker on the side of the cube facing you. This is what the following code block does.

```JavaScript
push();
texture(faces[0]);
translate(0, 0, size / 2); // Move to center of front face
rotateY(angle); // Rotate the plane
plane(size, size); // Draw a plane for the texture
pop();
```

We will use the same code block for each of the faces of the cube. For the front face, no rotation is necessary so `angle = 0`. For the back face of the cube, we need to rotate around the Y axis by `angle = PI`, for the right face we rotate around the Y axis by `angle = PI/2`, etc.

<p align="center"><img src="assets/cube.jpg" alt="cube with sprites" width="800px"></p>

Rendering sprites on each cube face is fairly straight forward compared to adding sprites to each face of the buckyball, since each face is tilted in different direction and the faces are not square. We need to do a couple of calculations to figure out the proper sprite placement. I got some help from chatGPT to figure this part out. First, we need to determine the centroid of the quadrilateral (either pentagon or hexagon), which is the average position of the points. This is accomplished with the calculateCentroid() function:

```JavaScript
calculateCentroid(face) {
    let sum = createVector(0, 0, 0);
    for (let j = 0; j < face.length; j++) {
      let v = this.vert[face[j]];
      sum.add(v);
    }
    return sum.div(face.length);
}
```

Next, we need to figure out the angle of rotation. Imagine an arrow sticking out perpendicular from each face -- this is called the normal vector. We can use the normal to determine how to rotate the sprite. The `calculateNormal()` function takes three of the vertices from each face and calculates the normal.

[myGeometry.computeNormals();](https://p5js.org/reference/p5.Geometry/vertexNormals/)

```JavaScript
calculateNormal(face) {
    let v0 = this.vert[face[0]];
    let v1 = this.vert[face[1]];
    let v2 = this.vert[face[2]];
    let edge1 = p5.Vector.sub(v1, v0);
    let edge2 = p5.Vector.sub(v2, v0);
    return edge1.cross(edge2).normalize();
  }
```

In WEBGL mode, we can pass both the angle and a vector to rotate about (in our case called`axis`) to the rotate() function. The cross product `zAxis.cross(normal)` calculates a vector that is perpendicular to both the Z axis and the normal, with the magnitude of `axis` measuring the difference in direction between the two vectors.

```JavaScript
let zAxis = createVector(0, 0, 1); // Starting direction
let axis = zAxis.cross(normal); // Axis of rotation
let angle = acos(zAxis.dot(normal)); // Angle between vectors
if (axis.mag() > 0) rotate(angle, axis);
```

<p align="center"><img src="assets/sprites.jpg" alt="Buckyball" width="800px"></p>

Now we can properly orient each sprite on all of the 32 faces of the buckyball. I am not sure how useful this is, but you can check out the buckyball with sprites rendered on each face [here](https://editor.p5js.org/kfahn/full/wpMPtzq2y).

## References

- [Bucky-ball](https://www.goldennumber.net/bucky-balls/)
- [Mathematics and the Buckyball](https://mathweb.ucsd.edu/~fan/amer.pdf)
- [Build a Buckyball Model](https://gems.education.purdue.edu/wp-content/uploads/2019/01/buckyballbuilding.pdf)
- [The Bucky Ball](http://www.ece.northwestern.edu/local-apps/matlabhelp/techdoc/math_anal/sparse12.html)
- [Graphs and Matrices](https://www.mathworks.com/help/matlab/math/graphs-and-matrices.html)
- [Adjacency-matrix-for-soccer-ball-football](https://math.stackexchange.com/questions/4477058/adjacency-matrix-for-soccer-ball-football)
- [Graph 1389 - Truncated Icosahedral Graph](https://houseofgraphs.org/graphs/1389)
- [Truncated_icosahedron](https://en.m.wikipedia.org/wiki/Truncated_icosahedron)
-[3d-mapping-a-dodecahedron](https://forum.electromage.com/t/3d-mapping-a-dodecahedron/682/3)