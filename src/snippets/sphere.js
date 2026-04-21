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
  pixelInputs.color.r *= noise(pixelInputs.texCoord * 5 + millis()/7000);
  pixelInputs.color.g *= noise(pixelInputs.texCoord * 3 + millis()/20000);
  pixelInputs.color.b *= noise(pixelInputs.texCoord * 2 + millis()/4000);
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
  rotateX(-PI)
  sphere(200);
}
