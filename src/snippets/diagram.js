/**
 *
 *.                THERE HAS BEEN SOME FEEDBACK ON THIS
 *                 IT HAS NOT YET BEEN IMPLEMENTED
 *
 *
 *
 *
 *
 *
 *
 *
 * This is a WIP! Please don't distribute (yet)
 *
 * Based on discussions by Kit and Moon.
 * Derivatives made using LLMs are not permitted.
 *
 * the interaction is there to demonstrate how the different components
 * of the libprocessing codebase (bottom) enable usage in different 
 * development environments and host language (top)
 */ 

let slide = 1;
let currentEditor = 0;

let elements = [
  {
    "name": "PDE\nJava",
    "lang": "Java",
    "coords": [10, 67, 200, 200],
    "draw": draw_editor
  },
  {
    "name": "PDE\nPython",
    "lang": "Python",
    "coords": [220, 67, 200, 200],
    "draw": draw_editor
  },
  {
    "name": "VSCode\nPython",
    "lang": "Python",
    "coords": [430, 67, 200, 200],
    "draw": draw_editor
  },
  {
    "name": "OpenProcessing\nJavaScript",
    "lang": "JavaScript",
    "coords": [640, 67, 200, 200],
    "draw": draw_editor
  },
  {
    "name": "hostlib",
    "description": "Imagine a sketch that imports a Processing/p5 library,\nfor using the common API in the host language.\nIn this example, that's {lang}.\nImagine this library, built with libprocessing.",
    "extra": "Multiple {lang} libraries can implement Processing/p5\nproviding a familiar API, with different strengths:\nperformance, compatibility, or additional features",
    "coords": [220, 320, 410, 100],
    "arrow": [0, -95]
  },
  {
    "name": "FFI",
    "description": "{ffi1}\nThis Foreign Function Interface (FFI) connects the rendering implementation (Rust) to the host language ({lang})",
    "extra": "{ffi2}",
    "coords": [10, 480, 830, 75],
     "arrow": [0, -95]
  },
  {
    "name": "render/lib.rs",
    "description": "render/lib.rs & others\nDefines the behavior & rendering\nFor example, the 'circle' function is here.",
    "coords": [10+270+10, 615, 270, 70],
    "arrow": [0,-95]
  },
  
  // (640+200-20)/3 = 273+(1/3)
  // 280-20=260
  // 260/3
  {
    "name": "ffi/lib.rs",
    "description": "ffi/lib.rs",
    "highlightOn": "Java",
    "coords": [10, 700, 270, 70],
  },
  {
    "name": "pyo3/lib.rs",
    "description": "pyo3/lib.rs",
    "highlightOn": "Python",
    "coords": [10+270+10, 700, 270, 70],
  },
  {
    "name": "wasm/lib.rs",
    "description": "wasm/lib.rs",
    "highlightOn": "JavaScript",
    "coords": [10+270*2+20, 700, 270, 70],
  },
  
  
];

function setup() {
  
  createCanvas(850, 830);
}

function draw() {
  background(255);
  
  textAlign(CENTER, CENTER);
  
  noFill()
  stroke("#3AB08B")
  rect(5,5,840,267);
  fill(0)
  noStroke()
  textSize(20)
  text("Draw a circle using libprocessing:", width/2, 35);
  
  noFill()
  stroke("#3AB08B")
  rect(5,610,840,215);
  fill(0)
  noStroke()
  text("This is libprocessing.", width/2, 800)
  
  textSize(14);
  let hoverOn = false;
  let whichHover = -1;
  for (let i = 0; i<elements.length; i++) {
    
    const midX = elements[i].coords[0] + elements[i].coords[2]/2;
    const midY = elements[i].coords[1] + elements[i].coords[3]/2;
    
    if (!hoverOn && !elements[i].highlightOn &&
        mouseX >= elements[i].coords[0] &&
        mouseX <= elements[i].coords[0] + elements[i].coords[2] &&
        mouseY >= elements[i].coords[1] &&
        mouseY <= elements[i].coords[1] + elements[i].coords[3]){
      
      stroke("#3AB08B");
      hoverOn = true;
      whichHover = i;
      
      if (elements[i].lang) {
        currentEditor = i;
      }
      
    }
    else {
      stroke(0);
    }
    
    
    if (elements[i].arrow){
      //stroke(0)
      arrow(midX, midY, midX + elements[i].arrow[0], midY + elements[i].arrow[1]);
    }
    
    if (whichHover ===i || currentEditor===i ){
      fill(255, 255, 200);
    } else{
      fill(255)
    }
    
        
    
      if (
        (elements[i].highlightOn === "Python" && elements[currentEditor].name.includes("Python")) ||
         (elements[i].highlightOn === "JavaScript" && elements[currentEditor].name.includes("JavaScript")) ||
         (elements[i].highlightOn === "Java" && elements[currentEditor].name.includes("PDE\nJava")) ||
      elements[i].description?.includes("render/lib.rs")) {
        stroke("#3AB08B")   
        fill(255, 255, 200);

        }
    
    rect(...elements[i].coords);
    fill(0);
    
    if (elements[i].draw) {
      elements[i].draw(elements[i])
    } else if(elements[i].description) {
      textAlign(CENTER, CENTER);
      noStroke();
      let showText = (whichHover === i && elements[i].extra) ? elements[i].extra : elements[i].description;
      showText = showText.replace("{lang}", elements[currentEditor].lang)
      
      if (elements[currentEditor].name.includes("Python")){
        showText = showText.replace("{ffi1}", "pyo3/lib.rs works with pyo3 to generate the Python module that the sketch can use.");
        showText = showText.replace("{ffi2}", "We maintain this FFI as part of supporting the primary host languages of Python and JavaScript.");

      }
      else if (elements[currentEditor].name.includes("JavaScript")){
        showText = showText.replace("{ffi1}", "wasm/lib.rs works with wasm (Web Assembly) to generate the JavaScritpt that the sketch can use.");
        showText = showText.replace("{ffi2}", "We maintain this FFI as part of supporting the primary host languages of Python and JavaScript.");

      } else{
        showText = showText.replace("{ffi1}", "ffi/lib.rs works with cbindgen to generate the {lang} Processing/p5 library that the sketch uses.");
        showText = showText.replace("{ffi2}", "If you want to use libprocessing in other host languages, such as Lua, you would build your Processing/p5 library using ffi/lib.rs.");
      }
      
      text(
        showText.replace("{lang}", elements[currentEditor].lang).replace("{ffi2}", ""),
        elements[i].coords[0] + (elements[i].coords[2]/2),
        elements[i].coords[1] + (elements[i].coords[3]/2)
      )
    }
    
  }
  
  //circle(width/2, height/2, 100);
}

function arrow(sourceX, sourceY, sinkX, sinkY){
  line(sourceX, sourceY, sinkX, sinkY);
  let size = 10;
  
  push();
  translate(sinkX, sinkY);
  rotate(atan2(sinkY - sourceY, sinkX - sourceX));
  triangle(0, 0, -size, -size/3, -size, size/3);
  pop();
}

function draw_editor(elt) {
  noStroke();
  textAlign(RIGHT, TOP);
  
  text(
    elt.name,
    (elt.coords[0]+elt.coords[2]-10),
    (elt.coords[1]+10)
  )
  
  textAlign(LEFT, TOP);
  if (elt.name.includes("Python")){
    text(
      (elt.name.includes("VSCode") ? "import processing\n\n" : "") +
      "def setup():\n  size(400, 400)\n\ndef draw():\n  background(220)\n  circle(200, 200, 50)",
      elt.coords[0] + 10,
      elt.coords[1] + 50
      );
  } else if(elt.name.includes("PDE\nJava")) {
    text(
      "void setup(){\n  size(400, 400);\n}\n\nvoid draw(){\n  background(220);\n  circle(200, 200, 50);\n}",
      elt.coords[0] + 10,
      elt.coords[1] + 50
      );
  } else {
    text(
      "function setup(){\n  createCanvas(400, 400);\n}\n\nfunction draw(){\n  background(220);\n  circle(200, 200, 50);\n}",
      elt.coords[0] + 10,
      elt.coords[1] + 50
      );
  }
}