// Author: Dave Pagurek

let cells;
let next;
let update;
let W = 0;
let H = 0;

async function setup() {
  W = windowWidth;
  H = windowHeight;
  createCanvas(windowWidth, windowHeight, WEBGL);

  cells = createFramebuffer({
    width: W,
    height: H,
    density: 1,
    textureFiltering: NEAREST,
  });

  cells.loadPixels();
  for (let i = 0; i < cells.pixels.length; i += 4) {
    cells.pixels[i] = random() > 0.7 ? 255 : 0;
    cells.pixels[i + 1] = cells.pixels[i];
    cells.pixels[i + 2] = cells.pixels[i];
    cells.pixels[i + 3] = 255;
  }
  cells.updatePixels();

  update = buildFilterShader(simulate);
  imageMode(CENTER);
  image(cells, 0, 0);
}

function simulate() {
  let w = uniformFloat(() => W);
  let h = uniformFloat(() => H);

  filterColor.begin();
  let x = floor(filterColor.texCoord.x * w);
  let y = floor(filterColor.texCoord.y * h);

  let n = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx != 0 || dy != 0) {
        let nx = (x + dx + w) % w;
        let ny = (y + dy + h) % h;
        n += getTexture(filterColor.canvasContent, [nx+0.5, ny+0.5] / [w, h]).r;
      }
    }
  }

  let alive = getTexture(filterColor.canvasContent, [x+0.5, y+0.5] / [w, h]).r;
  let nextOutput = 0;
  if (alive == 1) {
    if (n == 2 || n == 3) {
      nextOutput = 1;
    }
  } else {
    if (n == 3) {
      nextOutput = 1;
    }
  }
  filterColor.set([nextOutput, nextOutput, nextOutput, 1]);
  filterColor.end();
}

function draw() {
  filter(update);
}
