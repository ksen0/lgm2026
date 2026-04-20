let material;
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  describe("A textured sphere in the top right corner with colorful lights that react to the mouse.");
  noStroke();
  material = buildMaterialShader(noiseTexture);
}
function noiseTexture() {
  pixelInputs.begin();
  pixelInputs.color.rgb *= noise(pixelInputs.texCoord * 6 + millis()/5000);
  pixelInputs.end();
}
function draw() {
  shader(material);
  background(20, 0, 50);
  ambientLight(20, 0, 20);
  
  let mx = mouseX - width / 2;
  let my = mouseY - height / 2;

  pointLight(150, 130, 0, mx - 50, my+500, 250);
  pointLight(200, 0, 105, mx - 80, my, 400);
  directionalLight(0, 0, 150, width-mx/width, height-my/height, 0.5);
  
  translate(width/3, -height/4);
  sphere(200);
}
