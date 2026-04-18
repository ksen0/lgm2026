function setup() {
  createCanvas(windowWidth, windowHeight);
  describe('bouncing circles');
}
let x, y, dx, dy;
function draw() {
  background(10, 10, 30);
  if (!x) { x = width/2; y = height/2; dx = 3; dy = 2; }
  x += dx; y += dy;
  if (x < 0 || x > width)  dx *= -1;
  if (y < 0 || y > height) dy *= -1;
  circle(x, y, 80);
}