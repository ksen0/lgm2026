let levels = [
    "Level 0: The built-in filters are shaders (e.g., filter(BLUR))",
    "Level 1+ JS/p5.js prerequisites:<br>...Make and update variables. Call and define functions<br>...Familiarity with any of: mouseX, mouseY, frameCount, millis(), width, height, noise(), lerp(), map(), sin(), cos()",
    "Level 1: filter() and buildFilterShader() with hooks: filterColor & getTexture()",
    "Level 2+ JS/p5.js prerequisites - 3D modeling 101:<br>...Using coordinates in a sketch to position build-in models with model()<br>...Optional: Custom models with loadModel(),  buildGeometry(), textToModel()",
    "Level 2: buildMaterialShader() and the hooks that can be used with shader()",
    "Level 3+ JS/p5.js prerequisite: familiarity with each of: mouseX, mouseY, frameCount, millis(), width, height, noise(), lerp(), map(), sin(), cos()",
    "Level 3: Other builders, including for both shader() and strokeShader()",
    "Level 4: instanceID() and passing in data with setUniform(), uniformTexture()",
    "Level 5+ Prerequisite: initial experience with data structures",
    "Level 5: Using compute shaders and WebGPU"
]
let lines = [];
let myShader;
function setup() {
  createCanvas(windowWidth/2, windowHeight, WEBGL);
  
  let prevBox = styledText("", 0, 0, true, true, false);
  let padY = 20;
  for (let i in levels) {
    let offsetY = prevBox[1] + prevBox[3] + 20;
      if (levels[i].includes("rerequis")) {
        lines.push(offsetY + padY);
        offsetY += padY*2;
      }
    prevBox = styledText(levels[i], prevBox[0], offsetY);
  }

  myShader = buildStrokeShader(wiggleShader);
  
}
function wiggleShader() {
  worldInputs.begin();
  worldInputs.position.y += 20 * noise(millis() * 0.0001 + worldInputs.position.x * 0.1 + worldInputs.position.y * 0.1) - 10;
  worldInputs.end();
}


function draw(){
    background(0);
    stroke("#E91E63");
    strokeWeight(10);
    strokeShader(myShader);
    for (let i in lines) {
      beginShape();
      for (let x = -width/2; x < width/2; x += 20) {
        vertex(x, lines[i] - height/2);
      }
      endShape();
    }
}


function styledText(content, x, y){
  const padding = 5;
  let p = createP(content);
  
  p.position(window.innerWidth/2 + x, y);
  p.style('font-family', 'Space Grotesk');
  p.style('font-weight', '300');
  p.style('font-size', '18px');
  p.style('color', '#fff');
  p.style('margin', '0');
  p.style('padding', '0');
  
  return [
    x,
    y,
    p.elt.offsetWidth,
    p.elt.offsetHeight
  ];
}

   