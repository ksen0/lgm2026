let all_contributors;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  describe("A grid of GitHub profile pictures of the contributors to p5.js")
  all_contributors = await loadImage('fetched-assets/contributors.png');
}

function draw() {
  background(0);
  let xSpeed = 0.5;
  let ySpeed = -0.3;

  let xOffset = (-frameCount * xSpeed) % all_contributors.width;
  let yOffset = (-frameCount * ySpeed) % all_contributors.height;

  for (let x = xOffset - all_contributors.width; x < width; x += all_contributors.width) {
    for (let y = yOffset - all_contributors.height; y < height; y += all_contributors.height) {
      image(all_contributors, x, y);
    }
  }

  filter(POSTERIZE, map(mouseX, 0, windowWidth, 10, 2));

}