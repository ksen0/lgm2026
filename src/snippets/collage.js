// In 2025, the Processing Foundation joined an ambitious partnership with members of the Arts for Healing and Justice Network — Street Poets Inc., Versa-Style, No Easy Props, and the Unusual Suspects Theater Company — to bring creative coding resources to justice-impacted youth.
// The completed digital collage reflects the persistence of community, memory, and resistance within the youth-led performance. Courtesy of Ana C., Jiwon Ham, and Payton Croskey.
// Image from Processing Foundation Impact Report 2025
// https://processingfoundation.report/

let gif;

async function setup() {
  createCanvas(windowWidth / 2, windowHeight, WEBGL);
  pixelDensity(1);
  gif = await loadImage('here.gif');
}

function draw() {
  if (!gif) return;
  background(0);
  let w = gif.width * height / gif.height;
  image(gif, -w / 2, -height / 2, w, height);
}