function setup() {
  createCanvas(windowWidth, windowHeight);
  describe('circle follows mouse');
}
function draw() {
  background(20);
  circle(mouseX, mouseY, 100);
}