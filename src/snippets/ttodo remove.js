let material;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  describe("A white circle with black outline that tracks the mouse cursor as it moves.");
  material = buildMaterialShader(noiseTexture);
}

function noiseTexture() {
  pixelInputs.begin();
  pixelInputs.color.rgb *= noise(pixelInputs.texCoord * 5 + millis()/1000);
  pixelInputs.end();
}


function draw() {
  background(255);
  orbitControl(0, 0, 1);
  
  let mx = mouseX - width / 2;
  let my = mouseY - height / 2;
  
  shader(material);
  translate(mx, my, 0);

  sphere(200);
}


let material;
let font;
async function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  describe("A textured sphere in the top right corner with colorful lights that follow the mouse.");
  font = await loadFont( 'https://fonts.gstatic.com/s/epilogue/v17/O4ZRFGj5hxF0EhjimmIjuAkalnmd.ttf');
  material = buildMaterialShader(noiseTexture);
}
function noiseTexture() {
  pixelInputs.begin();
  pixelInputs.color.rgb *= noise(pixelInputs.texCoord * 5);
  pixelInputs.end();
}
function draw() {
  background(20, 0, 50);
  stroke(255);
  
  let mx = mouseX - width / 2;
  let my = mouseY - height / 2;

  pointLight(150, 130, 0, mx - 50, my, 250);
  pointLight(0, 0, 150, mx, my, 400);
  pointLight(200, 0, 105, mx - 80, my, 400);
  translate(70, -2, 500);

  let geom = font.textToModel("p5.js\nv2", -20, 50, { sampleFactor: 0.5, extrude: 50 })
  
  geom.normalize();
  shader(material);

  model(geom)
  //sphere(200);
}
