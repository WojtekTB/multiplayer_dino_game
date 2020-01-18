//Client side sketch

var myCanvas;
var mainPlayer;
var floorY = 500;

function setup() {
  myCanvas = createCanvas(innerWidth, innerHeight);
  myCanvas.parent("mainSketch");
  background(0);

  mainPlayer = new Player(10, 20, floorY);
}

function draw() {
  background(0);
  drawGround();
  mainPlayer.show();
  if (keyIsDown(32)) {
    mainPlayer.jump();
  }
}

function drawGround() {
  fill(255);
  rect(0, floorY, innerWidth, innerHeight - floorY);
}
