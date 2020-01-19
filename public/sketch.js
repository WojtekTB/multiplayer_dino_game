//Client side sketch

var socket;
var socketID;

var myCanvas;

var cactusImage;
var cactusContainer;
var cactusContainer1;
var cactusContainer2;
var cactusHeight = 50;
var cactusWidth = 25;

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
  cactusImage = loadImage(`./images/cactus/cactus.PNG`);
}

function setup() {
  socket = io.connect("http://localhost:3000");
  socket.on("message", data => {
    socketID = data;
  });
  socket.on("cactusMap", data => {
    cactusContainer = data;
    // console.log(data);
  });

  myCanvas = createCanvas(innerWidth, innerHeight);
  myCanvas.parent("mainSketch");
  background(0);

  groundImageWidht = groundImage.width;

  mainPlayer = new Player(10, innerHeight * 0.025, floorY, playerAnimations);

  scoreElement = document.getElementById("score");
  distanceElement = document.getElementById("distance");

  // testCactusContainer = new CactusContainer();
  // cactusContainer1 = testCactusContainer.getCactuses(1);
  // cactusContainer2 = testCactusContainer.getCactuses(1001);
  console.log(cactusContainer1);
}

function mousePressed() {
  mainPlayer.jump();
}

function draw() {
  background(mainPlayer.x / 1000);
  drawGround();
  mainPlayer.show();
  scoreElement.innerHTML = `Score: ${mainPlayer.getScore()} pt.`;
  distanceElement.innerHTML = `Distance: ${mainPlayer.x} m.`;
  drawCactuses();
  emitMyCord();
}

function drawCactuses() {
  let scale = 2000;
  if ((cactusContainer != null) & (mainPlayer.x > 0)) {
    let cactuses = cactusContainer[Math.floor(mainPlayer.x / scale)];
    let cactuses2 = cactusContainer[Math.floor(mainPlayer.x / scale) - 1];
    console.log(Math.floor(mainPlayer.x / scale));
    fill(255, 0, 0);
    for (cactus of cactuses) {
      // rect(
      //   innerWidth / 20 + (cactus.x - (mainPlayer.x % scale)),
      //   floorY,
      //   cactusWidth,
      //   -cactusHeight
      // );
      image(
        cactusImage,
        innerWidth / 20 + (cactus.x - (mainPlayer.x % scale)),
        floorY,
        cactusWidth,
        -cactusHeight
      );
      let cactusRealX = mainPlayer.x - (mainPlayer.x % scale) + cactus.x;
      if (
        (mainPlayer.x < cactusRealX + cactusWidth) &
        (mainPlayer.x > cactusRealX)
      ) {
        if (mainPlayer.y > floorY - cactusHeight) {
          console.log("HIT!");
        } else {
          console.log("safe");
        }
      }
    }
    // console.log(mainPlayer.x, mainPlayer.y);
    if (cactuses2 != null) {
      fill(0, 255, 0);
      for (cactus of cactuses2) {
        // rect(
        //   innerWidth / 20 + (cactus.x - (mainPlayer.x % scale)) - scale,
        //   floorY,
        //   cactusWidth,
        //   -cactusHeight
        // );
        image(
          cactusImage,
          innerWidth / 20 + (cactus.x - (mainPlayer.x % scale)) - scale,
          floorY,
          cactusWidth,
          -cactusHeight
        );
        let cactusRealX =
          mainPlayer.x - (mainPlayer.x % scale) - scale + cactus.x;
        if (
          (mainPlayer.x < cactusRealX + cactusWidth) &
          (mainPlayer.x > cactusRealX)
        ) {
          if (mainPlayer.y > floorY - cactusHeight) {
            console.log("HIT!");
          } else {
            console.log("safe");
          }
        }
      }
    }
    // console.log(cactuses, cactuses2);
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
  socket.emit("x", { id: socketID, x: mainPlayer.x, y: mainPlayer.y });
}
