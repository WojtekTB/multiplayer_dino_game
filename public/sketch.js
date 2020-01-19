//Client side sketch

var socket;
var socketID;

var myCanvas;

var cactusImage;
var cactusContainer1 = { array: [], relativeX: 0 };
var cactusContainer2 = { array: [], relativeX: 1 };
var cactusContainer3 = { array: [], relativeX: 2 };
var cactusHeight = 50;
var cactusWidth = 25;

var mainPlayer;
var floorY = innerHeight * (2 / 3);
var playerAnimations = [];
var deadPlayer;

var groundImage;
var groundImageWidht;
var cloudImage;

var scoreElement;
var distanceElement;

var players = [];
var clouds = [];
var hats = [];

function preload() {
  for (let i = 0; i < 3; i++) {
    playerAnimations.push(loadImage(`./images/dino_animation/frame_${i}.png`));
    // console.log(`../images/dino_animation/frame_${i}.png`);
  }
  groundImage = loadImage(`./images/floor.png`);
  cactusImage = loadImage(`./images/cactus/cactus.PNG`);
  deadPlayer = loadImage(`./images/dino_animation/frame_death.png`);
  cloudImage = loadImage(`./images/cloud.png`);
  for (let i = 0; i < hatArray.length; i++) {
    hats.push(loadImage("./images/dino_animation/" + hatArray[i]));
    console.log("./images/dino_animation/" + hatArray[i]);
  }
  hats.pop();
}

function setup() {
  noLoop();
  socket = io();
  socket.on("message", data => {
    socketID = data;
  });
  socket.on("initial-cactuses", data => {
    console.log("init cactuses recieved");
    //initial cactuses that one will need
    cactusContainer2.array = data.two;
    cactusContainer3.array = data.three;
    // console.log(cactusContainer2, cactusContainer3);
  });
  socket.on("cactus-answer", data => {
    cactusContainer1.array = cactusContainer2.array;
    cactusContainer2.array = cactusContainer3.array;
    cactusContainer3.array = data; //move data along the conveyor like line
    cactusContainer1.relativeX = cactusContainer2.relativeX;
    cactusContainer2.relativeX = cactusContainer3.relativeX;
    cactusContainer3.relativeX++; //move the id along
    // console.log(cactusContainer1, cactusContainer2, cactusContainer3);
  });
  socket.on("players", data => {
    players = data;
  });

  socket.on("scoreBoard", data => {
    let score = "";
    for (point of data) {
      // score += `\nName: ${point.name}  Score: ${point.score}`;
      console.log("I added stuff");
      $("#Score").append(`<li>Name: ${point.name}  Score: ${point.score}</li>`);
    }
    // $("#Score").innerHTML = score;
  });
  myCanvas = createCanvas(window.innerWidth, window.innerHeight);
  myCanvas.parent("mainSketch");
  background(0);

  groundImageWidht = groundImage.width;

  mainPlayer = new Player(10, innerHeight * 0.025, floorY, playerAnimations);

  scoreElement = document.getElementById("score");
  distanceElement = document.getElementById("distance");

  // testCactusContainer = new CactusContainer();
  // cactusContainer1 = testCactusContainer.getCactuses(1);
  // cactusContainer2 = testCactusContainer.getCactuses(1001);
  // console.log(cactusContainer1);
  document.getElementById("speed").innerHTML = `Speed: ${mainPlayer.speed}`;
  for (let i = 0; i < 3; i++) {
    clouds.push(
      new Cloud(
        random(innerWidth, innerWidth + 300),
        random(innerHeight * (2 / 3), 0)
      )
    );
  }
  // noLoop();
}

function mousePressed() {
  if (mouseY > innerHeight - innerHeight / 20) {
    return;
  }
  mainPlayer.jump();
}

function draw() {
  background(mainPlayer.x / 200);
  for (cloud of clouds) {
    cloud.show();
  }
  drawGround();
  mainPlayer.show();
  scoreElement.innerHTML = `Score: ${mainPlayer.getScore()} pt.`;
  distanceElement.innerHTML = `Distance: ${mainPlayer.getDistance()} m.`;
  drawCactuses();
  if (frameCount % 500) {
    emitMyCord();
  }
  drawOtherPlayers();
  if (keyIsDown(32)) {
    mainPlayer.jump();
  }
  if (touches.length != 0) {
    mainPlayer.jump();
  }
  if (mainPlayer.x / 2000 > cactusContainer2.relativeX) {
    requestCactuses(Math.floor(mainPlayer.x / 2000) + 1);
  }
  // mainPlayer.y = mouseY;
  // mainPlayer.vy = 0;
}

function drawCactuses() {
  let scale = 2000;
  if ((cactusContainer1 != null) & (mainPlayer.x > 0)) {
    let cactuses1 = cactusContainer1.array;
    let cactuses2 = cactusContainer2.array;
    let cactuses3 = cactusContainer3.array;
    // let cactuses = cactusContainer[Math.floor(mainPlayer.x / scale)];
    // let cactuses2 = cactusContainer[Math.floor(mainPlayer.x / scale) - 1];
    // console.log(Math.floor(mainPlayer.x / scale));
    // fill(255, 0, 0);
    // console.log(cactuses);
    for (cactus of cactuses2) {
      image(
        cactusImage,
        innerWidth / 10 + (cactus.x - (mainPlayer.x % scale)),
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
          // console.log("HIT!");
          died();
        } else {
          // console.log("safe");
        }
      }
    }
    // console.log(mainPlayer.x, mainPlayer.y);
    if (cactuses1 != null) {
      // fill(0, 255, 0);
      for (cactus of cactuses1) {
        // rect(
        //   innerWidth / 20 + (cactus.x - (mainPlayer.x % scale)) - scale,
        //   floorY,
        //   cactusWidth,
        //   -cactusHeight
        // );
        image(
          cactusImage,
          innerWidth / 10 + (cactus.x - (mainPlayer.x % scale)) - scale,
          floorY,
          cactusWidth,
          -cactusHeight
        );
      }
    }
    // console.log(cactuses, cactuses2);
    if (cactuses3 != null) {
      // fill(0, 255, 0);
      for (cactus of cactuses3) {
        // rect(
        //   innerWidth / 20 + (cactus.x - (mainPlayer.x % scale)) - scale,
        //   floorY,
        //   cactusWidth,
        //   -cactusHeight
        // );
        image(
          cactusImage,
          innerWidth / 10 + (cactus.x - (mainPlayer.x % scale)) + scale,
          floorY,
          cactusWidth,
          -cactusHeight
        );
      }
    }
    // console.log(cactuses, cactuses2);
  }
}

function drawOtherPlayers() {
  if (players.length == 0) {
    return;
  }
  for (let i = 0; i < players.length; i++) {
    // console.log("12345uy");
    if (players[i].id == socketID) {
      continue;
    }
    image(deadPlayer, players[i].x - mainPlayer.x, players[i].y, 50, -50);
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

function decreaseSpeed() {
  mainPlayer.decreaseSpeed();
  document.getElementById("speed").innerHTML = `Speed: ${mainPlayer.speed}`;
}
function addSpeed() {
  mainPlayer.addSpeed();
  document.getElementById("speed").innerHTML = `Speed: ${mainPlayer.speed}`;
}
function died() {
  socket.emit("dead", { id: socketID });
  console.log("you died");

  noLoop();
  showGameOver();
}

class Cloud {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = random(1, 5);
  }
  show() {
    image(cloudImage, this.x, this.y);
    this.x -= this.speed;
    if (this.x < -cloudImage.width) {
      this.x = random(innerWidth, innerWidth + 300);
      this.y = random(innerHeight * (2 / 3), 0);
      this.speed = random(1, 5);
    }
  }
}

function requestCactuses(x) {
  socket.emit("cactus-request", { id: socketID, x: x });
}
