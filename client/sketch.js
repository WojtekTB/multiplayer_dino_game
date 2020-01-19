//Client side sketch

var myCanvas;

var mainPlayer;
var floorY = innerHeight * (2 / 3);
var playerAnimations = [];

var groundImage;
var groundImageWidht;

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

  groundImageWidht = groundImage.width;

  mainPlayer = new Player(10, innerHeight * 0.08, floorY, playerAnimations);

  scoreElement = document.getElementById("score");
  distanceElement = document.getElementById("distance");
}

function mousePressed() {
  mainPlayer.jump();
}

function draw() {
  background(mainPlayer.x / 1000);
  drawGround();
  mainPlayer.show();
  //   if (keyIsDown(32)) {
  //     mainPlayer.jump();
  //   }
  scoreElement.innerHTML = `Score: ${mainPlayer.getScore()} pt.`;
  distanceElement.innerHTML = `Distance: ${mainPlayer.x} m.`;
}

function drawGround() {
  fill(255);
  rect(0, floorY, innerWidth, innerHeight - floorY);
  image(groundImage, (-1 * mainPlayer.x) % innerWidth, floorY - 15, innerWidth);
  image(
    groundImage,
    -1 * (mainPlayer.x % innerWidth) + innerWidth,
    floorY - 15,
    innerWidth
  );
}
