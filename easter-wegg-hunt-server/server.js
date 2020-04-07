const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const pino = require('express-pino-logger')();

//server on port 4001
const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);
app.use(pino);

const server = http.createServer(app);

const io = socketIo(server);
var count = 0;
const getApiAndEmit = async socket => {
  try {
    count = count + 1;
    socket.emit("FromAPI", count); // Emitting a new message. It will be consumed by the client
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};

//handle multiple users
let interval;

io.on("connection", socket => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 10000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
