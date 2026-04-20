let material;
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  describe("A textured sphere in the top right corner with colorful lights that follow the mouse.");
  material = buildMaterialShader(noiseTexture);
}
function noiseTexture() {
  pixelInputs.begin();
  pixelInputs.color.rgb *= noise(pixelInputs.texCoord * 5);
  pixelInputs.end();
}
function draw() {
  shader(material);
  background(20, 0, 50);
  
  let mx = mouseX - width / 2;
  let my = mouseY - height / 2;

  pointLight(150, 130, 0, mx - 50, my, 250);
  pointLight(0, 0, 150, mx, my, 400);
  pointLight(200, 0, 105, mx - 80, my, 400);
  translate(width/3, -height/4);

  sphere(200);
}