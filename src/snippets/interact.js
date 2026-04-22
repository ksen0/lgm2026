// Autohored by Dave Pagurek, remixed by Kit Kuksenok

let simShader;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  pixelDensity(1);
  
  loadPixels();
  
  for (let i=0; i< pixels.length; i += 4){
    pixels[i] = random() > 0.8 ? 255 : 0; // R
    pixels[i+1] = pixels[i]; // G
    pixels[i+2] = pixels[i]; // B
    pixels[i+3] = 255; 
  }
  updatePixels();
  
  simShader = buildFilterShader(simulate);
}

function simulate(){  
  filterColor.begin();
  
  let x = floor(filterColor.texCoord.x * width);
  let y = floor(filterColor.texCoord.y * height);
    
  let n = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx != 0 || dy != 0) {
        let nx = (x + dx + width) % width;
        let ny = (y + dy + height) % height;
        n += getTexture(filterColor.canvasContent, [nx+0.5, ny+0.5] / [width, height]).r;
      }
    }
  }
  n = round(n);
  
  let alive = round(getTexture(filterColor.canvasContent, [x+0.5, y+0.5] / [width, height]).r);
  
  let nextOutput = 0;
  if (alive == 1) {
    if (n == 2 || n == 3) {
      nextOutput = 1;
    } else {
      nextOutput = 0.1;
    }
  } else {
    if (n == 3) {
      nextOutput = 1;
    }
  }
  
  filterColor.set([nextOutput, nextOutput, nextOutput, 1]);
  filterColor.end();
}

function keyPressed(){
  if (key==="f"){
    console.log(simShader.fragSrc())
  }
}

function draw() {
  fill(0);
  filter(simShader);
  
  stroke(255);
  noFill();
  circle(mouseX - width/2, mouseY - height/2, 400);
}