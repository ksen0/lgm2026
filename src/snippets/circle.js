function setup() {
  createCanvas(windowWidth, windowHeight);
  background("pink");
  stroke("black");
  noFill();

  describe("A black circle that trails the mouse as it moves on a pink background.");
}

function draw() {
  circle(mouseX, mouseY, 400);
}
