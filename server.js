var express = require("express");

var app = express();
const port = process.env.PORT;
var server = app.listen(port || 3000);

app.use(express.static(`public`));

console.log("Server is running...");

var socket = require("socket.io");

var io = socket(server);

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Basic idea is to have it generate a long list of blocks withing every like 1000 meters
 * and then let you see what catuses are there from looking up your x as an id
 */

class CactusContainer {
  constructor() {
    //assume every array withoing the range array is rangeScale meters worth
    this.rangeScale = 2000;
    this.range = [];
    this.length = 10000; //how long the range will work
    for (let i = 0; i < this.length; i++) {
      this.generateCactusSet();
    }
  }
  getCactuses(x) {
    let placeOnRange = Math.floor(x / this.rangeScale);
    try {
      return this.range[placeOnRange];
    } catch (e) {
      console.log(e + " so I am adding more cactuses");
    }
  }

  generateCactusSet() {
    let numberOfCactuses = Math.floor(this.rangeScale * 0.003);
    let cactuses = [];
    for (let i = 0; i < numberOfCactuses; i++) {
      cactuses.push(
        Cactus.makeCactus(
          getRandomArbitrary(200, this.rangeScale + 200),
          25,
          50
        )
      );
    }
    this.range.push(cactuses);
  }
}

var scores = [];

class Cactus {
  static makeCactus(x, width, height) {
    return { x: x, width: width, height: height };
  }
}

var serverCactusContainer = new CactusContainer();

io.sockets.on("connection", socket => {
  console.log(`New connection: ${socket.id}`);
  socket.send(socket.id);
  socket.on("player", playerData);
  socket.emit("cactusMap", serverCactusContainer.range);
  socket.on("x", data => {
    socket.emit("players", data);
  });
  socket.on("score", data => {
    scores.push(data);
    socket.emit("scoreBoard", scores);
  });
});

var players = [];

function playerData(data) {
  if (players.length == 0) {
    players.push(data);
    return;
  }
  for (let i = 0; i < players.length; i++) {
    if (players[i].id == data.id) {
      players[i] = data.id;
    }
  }
  players.push(data);
}
