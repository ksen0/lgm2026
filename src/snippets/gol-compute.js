// noprotect
let cells;
let nextCells;
let gameShader;
let displayShader;
const W = 100;
const H = 100;

async function setup() {
  await createCanvas(100, 100, WEBGPU);

  let initial = new Float32Array(W * H);
  for (let i = 0; i < initial.length; i++) {
    initial[i] = random() > 0.7 ? 1 : 0;
  }
  cells = createStorage(initial);
  nextCells = createStorage(W * H);

  gameShader = buildComputeShader(simulate);
  displayShader = buildFilterShader(display);
}

function simulate() {
  let current = uniformStorage(() => cells);
  let next = uniformStorage(() => nextCells);
  let w = uniformInt(() => W);
  let h = uniformInt(() => H);
  let x = index.x;
  let y = index.y;

  let n = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx != 0 || dy != 0) {
        let nx = (x + dx + w) % w;
        let ny = (y + dy + h) % h;
        n += current[ny * w + nx];
      }
    }
  }

  let alive = current[y * w + x];
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
  next[y * w + x] = nextOutput;
}

function display() {
  let data = uniformStorage(() => cells);
  let w = uniformInt(() => W);
  let h = uniformInt(() => H);

  filterColor.begin();
  let x = floor(filterColor.texCoord.x * w);
  let y = floor(filterColor.texCoord.y * h);
  let alive = data[y * w + x];
  filterColor.set([alive, alive, alive, 1]);
  filterColor.end();
}

function draw() {
  compute(gameShader, W, H);
  [nextCells, cells] = [cells, nextCells];
  filter(displayShader);
}
