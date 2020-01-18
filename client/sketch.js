//Client side sketch

var myCanvas;

var mainPlayer;
var floorY = 500;
var playerAnimations = [];

var scoreElement = document.getElementById("score");
var distanceElement = document.getElementById("distance");

function preload() {
  for (let i = 0; i < 3; i++) {
    playerAnimations.push(loadImage(`../images/frame_${i}.png`));
    console.log(`../images/frame_${i}.png`);
  }
}

function setup() {
  myCanvas = createCanvas(innerWidth, innerHeight);
  myCanvas.parent("mainSketch");
  background(0);

  mainPlayer = new Player(10, 50, floorY, playerAnimations);
}

function draw() {
  background(0);
  drawGround();
  mainPlayer.show();
  if (keyIsDown(32)) {
    mainPlayer.jump();
  }
  //   scoreElement.write(frameCount);
}

function drawGround() {
  fill(255);
  rect(0, floorY, innerWidth, innerHeight - floorY);
}
