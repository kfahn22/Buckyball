# Calculating UV Coordinates for a n-sided polygon

buckyball3.js
https://p5js.org/reference/p5/normal/

The center coordinate should be set to (.5, .5)

```GLSL
    u = Math.cos(2*Math.PI*i/lines)/2 + .5
    v = Math.sin(2*Math.PI*i/lines)/2 + .5
```

```GLSL
public Polygon(int lines, float xOffset, float yOffset) 
    {       
        float vertices[] = new float[(lines+1)*3];  //number of angles + center
        float texturevertices[] = new float[(lines+1)*2];
        short indices[] = new short[lines+2];  //number of vertices + closing

        vertices[0*3]     = .0f; //set 1st to center
        vertices[(0*3)+1] = .0f;
        vertices[(0*3)+2] = .0f;
        indices[0] = 0;  
        texturevertices[0] = .5f; 
        texturevertices[1] = .5f;

        for (int i = 0; i < lines;i++)
        {
            vertices[(i+1)*3]     = (float) (xOffset * Math.cos(2*Math.PI*i/lines));
            vertices[((i+1)*3)+1] = (float) (yOffset * Math.sin(2*Math.PI*i/lines));
            vertices[((i+1)*3)+2] = 0.0f;//z

            indices[(i+1)] = (short)i;  

            texturevertices[(i+1)*2] =(float) (Math.cos(2*Math.PI*i/lines)/2 + 0.5f); 
            texturevertices[((i+1)*2)+1] = (float) (Math.sin(2*Math.PI*i/lines)/2 + 0.5f); 
        }

        indices[lines+1] = indices[1]; //closing part is same as for i=0       

        shape = new Vertex(vertices,indices);
        texture = new Vertex(texturevertices, indices);
    }   
```


## Reference

[how-to-determine-uv-texture-coordinates-for-n-sided-polygon](https://stackoverflow.com/questions/15552521/how-to-determine-uv-texture-coordinates-for-n-sided-polygon)
-https://stackoverflow.com/questions/5345392/undistorted-texture-coordinates

-https://discourse.threejs.org/t/dodecahedron-with-a-separate-texture-for-each-face/21897/5

- https://jsfiddle.net/prisoner849/2wrmyatL/

```JavaScript
import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import {OrbitControls} from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 100);
camera.position.set(0, 10, 10);
let renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x404040);
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

let controls = new OrbitControls(camera, renderer.domElement);

let g = new THREE.IcosahedronGeometry(5);
let colors = [];
let c = new THREE.Vector3();
let uv = [];
for(let i = 0; i < 20;i++){
	c.random().multiplyScalar(0.5).addScalar(0.5);
	colors.push(c.x, c.y, c.z, c.x, c.y, c.z, c.x, c.y, c.z);
  uv.push(
  	(0.067 + i) / 20, 0.25, 
    (0.933 + i) / 20, 0.25, 
    (0.5 + i) / 20, 1
  );
}
g.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));

let m = new THREE.MeshBasicMaterial({vertexColors: true, map: makeNumbers()});
let o = new THREE.Mesh(g, m);
scene.add(o);


renderer.setAnimationLoop( _ => {
	renderer.render(scene, camera);
})

function makeNumbers(){
	let c = numbers;
  let ctx = c.getContext("2d");
  ctx.fillStyle = "#fff";
	ctx.fillRect(0, 0, c.width, c.height);
  
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#000";
  ctx.font = 'bold 20px Arial';
  let step = 1024 / 20;
  let start = step * 0.5;
  
  for (let i = 0; i < 20; i++){
  	ctx.fillText(i + 1, start + step * i, 32);
  }
  
  return new THREE.CanvasTexture(c);
}
```


[tetrahedron-non-indexed-buffer-geometry](https://discourse.threejs.org/t/tetrahedron-non-indexed-buffer-geometry/12542)
```
// tetrahedron
// ---------------------------------------------------------------------------------------
var pts = [ // https://en.wikipedia.org/wiki/Tetrahedron#Coordinates_for_a_regular_tetrahedron
  new THREE.Vector3(Math.sqrt(8 / 9), 0, -(1 / 3)),
  new THREE.Vector3(-Math.sqrt(2 / 9), Math.sqrt(2 / 3), -(1 / 3)),
  new THREE.Vector3(-Math.sqrt(2 / 9), -Math.sqrt(2 / 3), -(1 / 3)),
  new THREE.Vector3(0, 0, 1)
];

var faces = [ // triangle soup
  pts[0].clone(), pts[2].clone(), pts[1].clone(),
  pts[0].clone(), pts[1].clone(), pts[3].clone(),
  pts[1].clone(), pts[2].clone(), pts[3].clone(),
  pts[2].clone(), pts[0].clone(), pts[3].clone()
];

var geom = new THREE.BufferGeometry().setFromPoints(faces);
geom.rotateX(-Math.PI * 0.5);
geom.computeVertexNormals();

geom.setAttribute("uv", new THREE.Float32BufferAttribute([ // UVs
  0.5, 1, 0.06698729810778059, 0.2500000000000001, 0.9330127018922194, 0.2500000000000001,
  0.06698729810778059, 0.2500000000000001, 0.9330127018922194, 0.2500000000000001, 0.5, 1,
  0.06698729810778059, 0.2500000000000001, 0.9330127018922194, 0.2500000000000001, 0.5, 1,
  0.06698729810778059, 0.2500000000000001, 0.9330127018922194, 0.2500000000000001, 0.5, 1
], 2));
// ---------------------------------------------------------------------------------------
```

https://github.com/mrdoob/three.js/issues/1741

[width-to-height-formula-for-hexagon](https://math.stackexchange.com/questions/796081/width-to-height-formula-for-hexagon)