var express = require("express");

var app = express();
const port = process.env.PORT;
var server = app.listen(port || 8000);

app.use(express.static(`public`));

console.log("Server is running...");

var socket = require("socket.io");

var io = socket(server);

io.sockets.on("connection", socket => {
  console.log(`New connection: ${socket.id}`);
  socket.send(socket.id);
  socket.on("player", playerData);
});

var players = [];

function playerData(data) {
  if (players.length == 0) {
    players;
    x;
  }
  for (let i = 0; i < players.length; i++) {}
}
