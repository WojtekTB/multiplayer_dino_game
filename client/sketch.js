//Client side sketch

var myCanvas;

var mainPlayer;
var floorY = 500;
var playerAnimations = [];

var groundImage;

var scoreElement;
var distanceElement;

function preload() {
  for (let i = 0; i < 3; i++) {
    playerAnimations.push(loadImage(`../images/dino_animation/frame_${i}.png`));
    // console.log(`../images/dino_animation/frame_${i}.png`);
  }
  groundImage = loadImage(`../images/floor.png`);
}

function setup() {
  myCanvas = createCanvas(innerWidth, innerHeight);
  myCanvas.parent("mainSketch");
  background(0);

  mainPlayer = new Player(10, 50, floorY, playerAnimations);

  scoreElement = document.getElementById("score");
  distanceElement = document.getElementById("distance");
}

function draw() {
  background(0);
  drawGround();
  mainPlayer.show();
  if (keyIsDown(32)) {
    mainPlayer.jump();
  }
  scoreElement.innerHTML = `Score: ${mainPlayer.getScore()} pt.`;
}

function drawGround() {
  fill(255);
  rect(0, floorY, innerWidth, innerHeight - floorY);
}
