function setup() {
  createCanvas(400, 400);
  background(255);
  describe("A white circle with black outline that tracks the mouse cursor as it moves.");
}

function draw() {
  circle(mouseX, mouseY, 200);
}