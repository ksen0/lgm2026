// Based on:
// Filter Shader (p5.strands): Created by Dave Pagurek. Remixed by Dorine Tipo. From 2026 onwards, edited and maintained by p5.js Contributors and Processing Foundation. Licensed under CC BY-NC-SA 4.0.

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