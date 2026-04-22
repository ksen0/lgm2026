let img;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  describe("A grid of GitHub profile pictures of the contributors to p5.js")
  img = await loadImage('fetched-assets/contributors.png');
}

function draw() {
  background(0);
  let xSpeed = 0.5;
  let ySpeed = -0.3;

  let xOffset = (-frameCount * xSpeed) % img.width;
  let yOffset = (-frameCount * ySpeed) % img.height;

  for (let x = xOffset - img.width; x < width; x += img.width) {
    for (let y = yOffset - img.height; y < height; y += img.height) {
      image(img, x, y);
    }
  }

  // Interactive blur:
  // let cutoff = windowWidth/5*4;
  // filter(BLUR, map(max(cutoff, mouseX), cutoff, windowWidth, 10, 0));

}