// Remix of:
// Filter Shader: Creared by Dave Pagurek. Edited and maintained by p5.js Contributors and Processing Foundation. Licensed under CC BY-NC-SA 4.0.


let video;
let displaceColors;

let displaceColorsSrc = `
precision highp float;

uniform sampler2D tex0;
varying vec2 vTexCoord;

vec2 zoom(vec2 coord, float amount) {
  vec2 relativeToCenter = coord - 0.5;
  relativeToCenter /= amount; // Zoom in
  return relativeToCenter + 0.5; // Put back into absolute coordinates
}

void main() {
  // Get each color channel using coordinates with different amounts
  // of zooms to displace the colors slightly
  gl_FragColor = vec4(
    texture2D(tex0, vTexCoord).r,
    texture2D(tex0, zoom(vTexCoord, 1.05)).g,
    texture2D(tex0, zoom(vTexCoord, 1.1)).b,
    texture2D(tex0, vTexCoord).a
  );
}
`;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.hide();
  video.loop();
  
  displaceColors = createFilterShader(displaceColorsSrc);
  
  describe(
    'Webcam feed with colors getting more offset the further from the center they are'
  );
}

function draw() {
  background(255);
  push();
  imageMode(CENTER);
  image(
    video,
    0, 0, width, height,
    0, 0, video.width, video.height,
    COVER
  );
  pop();
  filter(displaceColors);
}