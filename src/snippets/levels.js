let levels = [
    "Level 0: The built-in filters are shaders (e.g., filter(BLUR))",
    "Level 1+ JS/p5.js prerequisites:<br>You can make and update variables<br>You can call functions<br>You can create named global functions, similar to the standard setup and draw in p5<br>You can do some math in JavaScript",
    "Level 1: filter() and buildFilterShader() with hooks: filterColor & getTexture()",
    "Level 2+ JS/p5.js prerequisites - 3D modeling 101:<br>Using coordinates in a sketch<br>model() and build-in models plane, box, cylinder, cone, sphere, ellipsoid<br>Optional: Custom models with loadModel() and buildGeometry()<br>Optional: Models based on text using textToModel() (may need woff2 add-on)",
    "Level 2: shader(), buildColorShader() and related hooks",
    "Level 3: buildNormalShader() and related hooks",
    "Level 4: buildStrokeShader() + strokeShader() + hooks (objectInputs, worldInputs, cameraInputs, finalColor, pixelInputs)",
    "Level 5+ JS/p5.js prerequisites:\nmouseX, mouseY, frameCount, millis(), width, height, random(), noise(), lerp(), map(), sin(), cos()",
    "Level 5: buildMaterialShader()",
    "Level 6: instanceID()",
    "Level 7: Passing in variables: setUniform()",
    "Level 8: Passing in textures with uniformTexture",
    "Level 8: Using compute shaders: createStorage(), buildComputeShader(), compute()"
]
let lines = [];
function setup() {
  createCanvas(windowWidth/2, windowHeight);
  let style = document.createElement('style');
  style.innerHTML = '.highlight { color: #E91E63; } .brush {background: #192877; }';
  document.head.appendChild(style);
  
  let prevBox = styledText("", 0, 0, true, true, false);
  let padY = 20;
  for (let i in levels) {
    let offsetY = prevBox[1] + prevBox[3] + 20;
      if (levels[i].includes("rerequisites")) {
        lines.push(offsetY + 25);
        offsetY += 50;
      }
    prevBox = styledText(levels[i], prevBox[0], offsetY);
  }
  

  noLoop();
}

function draw(){
  for (let i in lines) {
    line(0, width, line[i], line[i])
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

   