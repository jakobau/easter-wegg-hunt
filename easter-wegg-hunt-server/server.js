//Import dependencies
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const axios = require("axios");
const pino = require('express-pino-logger');

//Import classes
const {LiveGames} = require('./utils/liveGames');
const {Players} = require('./utils/players');

//server on port 4001
const port = 4001;
const index = require("./routes/index");

const app = express();
app.use(index);
app.use(pino);
const server = http.createServer(app);
const io = socketIO(server);

var games = new LiveGames();
var players = new Players();

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

  //testing
  socket.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      socket.emit('timer', new Date());
    }, interval);
  });

  //old code
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 10000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  //when host connects for the first time
  socket.on('host-join', (data) =>{
    //if (err) throw err;
    console.log("Host joined with data:", data);

    var gamePin = Math.floor(Math.random()*90000) + 10000; //new pin for game

    //Creates a game with pin and host id
    games.addGame(gamePin, socket.id, false, {playersAnswered: 0, questionLive: false, gameid: data.id, question: 1});

    var game = games.getGame(socket.id); //Gets the game data
    socket.join(game.pin);//The host is joining a room based on the pin
    socket.emit('showGamePin', {
        pin: game.pin
    });
  });

  //when player connects for first time
  socket.on('player-join', (params) =>{
    var gameFound = false; //If a game is found with pin provided by player
    //For each game in the Games class
    for(var i = 0; i < games.games.length; i++){
        //If the pin is equal to one of the game's pin
        if(params.pin == games.games[i].pin){

            console.log('Player connected to game');

            var hostId = games.games[i].hostId; //Get the id of host of game

            players.addPlayer(hostId, socket.id, params.name, {score: 0, answer: 0}); //add player to game

            socket.join(params.pin); //Player is joining room based on pin

            var playersInGame = players.getPlayers(hostId); //Getting all players in game

            io.to(params.pin).emit('updatePlayerLobby', playersInGame);//Sending host player data to display
            gameFound = true; //Game has been found
        }
    }

    //If the game has not been found
    if(gameFound == false){
        socket.emit('noGameFound'); //Player is sent back to 'join' page because game was not found with pin
    }
  });

  //when host starts game
  socket.on('startGame', () => {
        var game = games.getGame(socket.id);//Get the game based on socket.id
        game.gameLive = true;
        socket.emit('gameStarted', game.hostId);//Tell player and host that game has started
    });

  //when player or host disconnects
  socket.on('disconnect', () => {
      var game = games.getGame(socket.id); //Finding game with socket.id
      //If a game hosted by that id is found, the socket disconnected is a host
      if(game){
          //Checking to see if host was disconnected or was sent to game view
          if(game.gameLive == false){
              games.removeGame(socket.id);//Remove the game from games class
              console.log('Game ended with pin:', game.pin);

              var playersToRemove = players.getPlayers(game.hostId); //Getting all players in the game

              //For each player in the game
              for(var i = 0; i < playersToRemove.length; i++){
                  players.removePlayer(playersToRemove[i].playerId); //Removing each player from player class
              }

              io.to(game.pin).emit('hostDisconnect'); //Send player back to 'join' screen
              socket.leave(game.pin); //Socket is leaving room
          }
      }else{
          //No game has been found, so it is a player socket that has disconnected
          var player = players.getPlayer(socket.id); //Getting player with socket.id
          //If a player has been found with that id
          if(player){
              var hostId = player.hostId;//Gets id of host of the game
              var game = games.getGame(hostId);//Gets game data with hostId
              var pin = game.pin;//Gets the pin of the game

              if(game.gameLive == false){
                  players.removePlayer(socket.id);//Removes player from players class
                  var playersInGame = players.getPlayers(hostId);//Gets remaining players in game

                  io.to(pin).emit('updatePlayerLobby', playersInGame);//Sends data to host to update screen
                  socket.leave(pin); //Player is leaving the room

              }
          }
      }

  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
