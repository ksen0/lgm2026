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