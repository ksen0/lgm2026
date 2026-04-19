// Loosely based on / inspired by:
// Internet Fridge Poetry workshop (April 19, 2025)
// https://linktr.ee/p5js2.0

let currentTopWord
let currentBottomWord
let font
let pixelate


async function setup() {
    
  // Stretch the canvas to fit screen
  createCanvas(windowWidth, windowHeight, WEBGL)
  
  // Create a screenreader description of the sketch
  describe("After a green loading screen, pink text in the middle of a navy screen writing out a random word pair from a shared word-bank")
  
  // Add a background color so the screen is not blank
  // while words are loading
  background("#98C800")
  
  // WEBGL mode will need a ttf or an otf
  // This needs a different URL than default Canvas mode, but it is possible to find here:
  // https://developers.google.com/fonts/docs/developer_api
  // Click on "API" in the right-hand tab, select "VF" capability,
  // and search for the font - in this case, the "family" should be Epilogue
  font = await loadFont(
    'https://fonts.gstatic.com/s/epilogue/v17/O4ZRFGj5hxF0EhjimmIjuAkalnmd.ttf'
  )
  
  await preparePossibleWords();
  currentTopWord = updateWord(currentTopWord)
  currentBottomWord = updateWord(currentBottomWord)
  
}

function draw() {
  orbitControl()
  
  // Set the background color
  background("#1B065E")
  
  // Center the text
  textAlign(CENTER)

  // Set the text color
  fill("#FD9DB9")
  
  // Set the text stroke color
  noStroke()
  
  //Use the font
  textFont(font)
  
  // Set the text size
  textSize(100)
  let pacing = sin(frameCount / 100)
  textWeight(map(pacing, -1, 1, 100, 900))
  
  directionalLight(color("#ff0"), 0, 0, -1);
  directionalLight(color("#f0f"), 0, 8, -1);
  directionalLight(color("#0f0"), 2, -8, -1);
  directionalLight(color("#0ff"), 2.5, -7, -1);
  
  // Set the position of the words and display them
  displayText(currentTopWord, 0, -60)
  displayText(currentBottomWord, 0, 60)
  
  // Describe the words being displayed for screenreaders
  describeElement('Words', currentTopWord + ' ' + currentBottomWord)
  
  // Update the words
  currentTopWord = updateWord(currentTopWord)
  currentBottomWord = updateWord(currentBottomWord)
  
}

function displayText(word, x, y) {
  let  pacing = sin(frameCount / 100)
  
  let geom = font.textToModel(word, x, y, { sampleFactor: 0.1, extrude: map(pacing, -1, 1, 100, 10) })
  
  model(geom)
  
}
