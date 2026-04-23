let build = {
  "buildFilterShader()": ["filter()", "filterColor", "getTexture()"],
  "buildColorShader()": ["shader()", "getTexture() with uniformTexture", "objectsInputs", "worldInputs", "cameraInputs", "finalColor", "instanceID()"],
  "buildNormalShader()": ["shader()", "getTexture() with uniformTexture", "objectsInputs", "worldInputs", "cameraInputs", "finalColor", "instanceID()"],
  "buildStrokeShader()": ["strokeShader()", "getTexture() with uniformTexture", "objectsInputs", "worldInputs", "cameraInputs", "finalColor", "pixelInputs", "instanceID()"],
  "buildMaterialShader()": ["shader()", "getTexture() with uniformTexture", "objectsInputs", "worldInputs", "cameraInputs", "finalColor", "combineColors", "pixelInputs", "instanceID()"],
}

let use = ["filter()", "shader()", "strokeShader()"];

let hook = ["filterColor", "objectsInputs", "worldInputs", "cameraInputs", "finalColor", "pixelInputs", "combineColors", "instanceID()", "getTexture()", "getTexture() with uniformTexture"];

let hoverText = "filter()";

function setup() {
  createCanvas(600, windowHeight).parent('sketch-container');
  let addStyle = document.createElement('style');
  addStyle.innerHTML = '.highlight { color: #E91E63; } .brush {background: #192877; }';
  document.head.appendChild(addStyle);
  
  let prevBox = styledText("<span class='highlight'>Build in setup()</span>", 0, height/3*2-20, true, true, false);
  for (let fn in build) {
    prevBox = styledText(fn, prevBox[0], prevBox[1] + prevBox[3], true, true, true);
  }
  
  prevBox = styledText("<span class='highlight'>Use in setup() or draw()</span>", 0, prevBox[1] + prevBox[3], true, true, false);
  
  use.forEach((item, i) => {
    prevBox = styledText(item, prevBox[0], prevBox[1] + prevBox[3], true, true, true);
  });

  prevBox = styledText("<span class='highlight'>Define behavior with hooks</span>", width/2, height/3*2-20, true, true, false);
  
  hook.forEach((item, i) => {
    prevBox = styledText(item, prevBox[0], prevBox[1] + prevBox[3], true, true, true);
  });
}

function draw() {
  background(0);
  selectAll('p:not(.sticky)').forEach(p => p.remove());

  noStroke();
  
  let currentBuild = "";
  let currentUse = "";
  let currentHook = "";
  
  highlightHovered(hoverText);

  if (hoverText in build) {
    currentBuild = hoverText;
    let items = build[hoverText];
    currentUse = items.find(item => use.includes(item));
    currentHook = items.find(item => hook.includes(item));
  }

  if (use.includes(hoverText)) {
    currentUse = hoverText;
    // Find which build contains this use
    for (let k in build) {
      if (build[k].includes(hoverText)) {
        currentBuild = k;
        currentHook = build[k].find(item => hook.includes(item));
        break;
      }
    }
  }

  if (hook.includes(hoverText)) {
    currentHook = hoverText;
    // Find which build contains this hook
    for (let k in build) {
      if (build[k].includes(hoverText)) {
        currentBuild = k;
        currentUse = build[k].find(item => use.includes(item));
        break;
      }
    }
  }
  
  if (currentBuild && currentUse && currentHook) {
    
    if (currentHook === "getTexture()"){
    		currentHook = "  filterColor.begin();\n  let c = getTexture(\n    filterColor.canvasContent,\n    filterColor.texCoord\n  	);\n  filterColor.set(...);\n  filterColor.end();"
    	}
	else if (currentHook === "getTexture() with uniformTexture"){
	    	currentHook = "  ....begin();\n  const textInput = uniformTexture(...);\n  ....end();"
    }
    else if (currentHook === "filterColor"){
    	currentHook = "  filterColor.begin();\n  filterColor.set([1, 0, 0, 1]);\n  filterColor.end();"
    }
    else if (currentHook !== "instanceID()"){
    	currentHook = "  "+currentHook+".begin();\n  ...\n  "+currentHook+".end();"
    }

    currentBuild = currentBuild.slice(0, -2) + "(<span class='highlight'>myShaderBuilder</span>);";

    currentUse = "  " + currentUse.slice(0, -2) + "(<span class='highlight'>myShader</span>);";


    if (currentHook === "instanceID()"){
    	currentBuild += "\n  instance = buildGeometry(...);"
    	currentUse += "\n  model(instance, 50);"
    	currentHook = "  worldInputs.begin();\n  let progress = instanceID();\n  ...\n  worldInputs.end();"
    }

    const arrowHeight= 10;

    let builderBox = styledText("<pre>let <span class='highlight'>myShader</span>;\nfunction setup(){\n  createCanvas(100, 100, WEBGL);\n  <span class='highlight'>myShader</span> = "+currentBuild+"\n  ...\n}</pre>", 0, 0);

    let usageBox = styledText("<pre>function draw(){\n"+currentUse+"\n  ...\n}</pre>", 0, builderBox[1] + builderBox[3] + arrowHeight);

    let functionBox = styledText("<pre>function <span class='highlight'>myShaderBuilder</span>(){\n"+currentHook+"\n}</pre>", 0, usageBox[1] + usageBox[3] + arrowHeight);
    
        
    fill(255, 0, 230, 30);
    rect(...builderBox);
    rect(...usageBox);
    rect(...functionBox);
    //boxArrow(builderBox, usageBox);
    //boxArrow(builderBox, functionBox);
    fill(255);
  }
  
}

function styledText(content, x, y, sticky, highlighted, hoverable){
  const padding = 5;
  let p = createP(content);
  
  p.position(x, y);
  p.style('font-family', 'Space Grotesk');
  p.style('font-weight', '300');
  p.style('font-size', '18px');
  p.style('color', '#fff');
  p.style('margin', '0');
  p.style('padding', '0');
  
  if (sticky === true) {
    p.addClass('sticky');
  }
  if (highlighted === true) {
    p.addClass('highlight');
  }
  if (hoverable === true) {
    p.attribute('data-content', content);
    p.mouseOver(() => hoverText = p.html());
    //p.mouseOut(() => {
    //  hoverText = hoverText === p.html() ? '' : hoverText
    //});
  }
  
  return [
    x,
    y,
    p.elt.offsetWidth,
    p.elt.offsetHeight
  ];
}

function highlightHovered(hoverText){
if (hoverText) {
  let related = [hoverText];
  
  if (hoverText in build) {
    // Hovering a build: highlight its uses and hooks only
    related.push(...build[hoverText]);
  } else if (use.includes(hoverText)) {
    // Hovering a use: highlight builds and hooks that use it
    for (let k in build) {
      if (build[k].includes(hoverText)) {
        related.push(k);
        build[k].forEach(item => {
          if (hook.includes(item)) related.push(item);
        });
      }
    }
  } else if (hook.includes(hoverText)) {
    // Hovering a hook: highlight builds and uses that use it
    for (let k in build) {
      if (build[k].includes(hoverText)) {
        related.push(k);
        build[k].forEach(item => {
          if (use.includes(item)) related.push(item);
        });
      }
    }
  }
  
  selectAll('.sticky').forEach(p => {
    let content = p.attribute('data-content');
    if (related.includes(content)) {
      p.addClass('brush');
    } else {
      p.removeClass('brush');
    }
  });
}
}