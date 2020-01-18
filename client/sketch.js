var myCanvas;

function setup() {
  myCanvas = createCanvas(innerWidth, innerHeight);
  myCanvas.parent("mainSketch");
  background(0);
}

function mouseClicked() {
  fill(255, 0, 0);
  rect(mouseX, mouseY, 100, 100);
}

function keyPressed() {
  background(0);
}

function draw() {
  //   background(0);
  //   fill(255, 0, 0);
  //   rect(mouseX, mouseY, 100, 100);
}
