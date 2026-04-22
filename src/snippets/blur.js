let video;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.hide();
  video.loop();
}

function draw() {
  background(255);
  imageMode(CENTER);
  image(video, 0, 0, width, height, 0, 0, video.width, video.height, COVER);
  filter(BLUR, 100);
}