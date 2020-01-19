//Client side sketch

var socket;
var socketID;

var myCanvas;

var testCactusContainer;

var cactusContainer1;
var cactusContainer2;

var mainPlayer;
var floorY = innerHeight * (2 / 3);
var playerAnimations = [];

var groundImage;
var groundImageWidht;

var scoreElement;
var distanceElement;

function preload() {
  for (let i = 0; i < 3; i++) {
    playerAnimations.push(loadImage(`./images/dino_animation/frame_${i}.png`));
    // console.log(`../images/dino_animation/frame_${i}.png`);
  }
  groundImage = loadImage(`./images/floor.png`);
}

function setup() {
  socket = io.connect("http://localhost:8000");
  socket.on("message", data => {
    socketID = data;
  });

  myCanvas = createCanvas(innerWidth, innerHeight);
  myCanvas.parent("mainSketch");
  background(0);

  groundImageWidht = groundImage.width;

  mainPlayer = new Player(10, innerHeight * 0.025, floorY, playerAnimations);

  scoreElement = document.getElementById("score");
  distanceElement = document.getElementById("distance");

  testCactusContainer = new CactusContainer();
  cactusContainer1 = testCactusContainer.getCactuses(1);
  cactusContainer2 = testCactusContainer.getCactuses(1001);
  console.log(cactusContainer1);
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
  drawCactuses();
  emitMyCord();
}

function drawCactuses() {
  for (let i = 0; i < cactusContainer1.length; i++) {
    let params = cactusContainer1[i];
    fill(255, 0, 0);
    rect(
      innerWidth / 20 +
        (params.x - (mainPlayer.x % testCactusContainer.rangeScale)),
      floorY,
      params.width,
      -params.height
    );
  }
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

function emitMyCord() {
  socket.emit("player", { id: socketID, x: mainPlayer.x, y: mainPlayer.y });
}
