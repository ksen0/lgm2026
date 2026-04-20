function setup() {
  createCanvas(windowWidth, windowHeight);
  background("pink");
  stroke("purple");
  noFill();

  describe("A purple circle on a pink background that trails the mouse as it moves.");
}

function draw() {
  circle(mouseX, mouseY, 400);
}
