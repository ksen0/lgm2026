let material;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  pixelDensity(1);
  describe("A textured sphere in the top right corner.");
  background(10, 0, 20);
  noStroke();
  // Create the shader
  material = buildMaterialShader(noiseTexture);
}

function noiseTexture() { 
  // Use p5.strands hooks to describe modifications to a default shader
  pixelInputs.begin();
  pixelInputs.color.r *= noise(pixelInputs.texCoord * 5 + millis()*0.00008);
  pixelInputs.color.g *= noise(pixelInputs.texCoord * 3 + millis()*0.00005);
  pixelInputs.color.b *= noise(pixelInputs.texCoord * 2 + millis()*0.00025);
  pixelInputs.end();
}

function draw() {
  // Apply the shader
  shader(material);
  
  let mx = mouseX - width / 2;
  let my = mouseY - height / 2;

  if (mouseIsPressed) {
    translate(mx, my);
  } else {
    translate(width/3, -height/4);
  }

  //directionalLight(200, 200, 255, 1, -1, -1);
  //directionalLight(255, 200, 200, -1, 0.5, -1);

  rotateX(-PI)
  sphere(200);
}
