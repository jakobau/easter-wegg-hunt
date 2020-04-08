const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {LiveGames} = require('./liveGames');
const {Players} = require('./players');
const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var games = new LiveGames();
var players = new Players();

//TODO:: setup database

app.use(express.static(publicPath));

//Starting server on port 3000
server.listen(3000, () => {
    console.log("Server started on port 3000");
});

//When a connection to server is made from client
io.on('connection', (socket) => {
  console.log("a new client has connected");

  //When host connects for the first time
  socket.on('host-join', (data) =>{
    //if game found in database
    var gamePin = Math.floor(Math.random()*90000) + 10000; //new pin for game
    games.addGame(gamePin, socket.id, false, {playersAnswered: 0, questionLive: false, gameid: data.id, question: 1}); //Creates a game with pin and host id

    var game = games.getGame(socket.id); //Gets the game data
    socket.join(game.pin);//The host is joining a room based on the pin
    console.log('Game Created with pin:', game.pin, socket.id);

    //Sending game pin to host so they can display it for players to join
    socket.emit('showGamePin', {
        pin: game.pin
    });

    //else no game found in database
    /*}else{
        socket.emit('noGameFound');
    }*/
  });

  //When player connects for the first time
  socket.on('player-join', (params) => {

    var gameFound = false; //If a game is found with pin provided by player

    //For each game in the Games class
    for(var i = 0; i < games.games.length; i++){
      //If the pin is equal to one of the game's pin
      if(params.pin == games.games[i].pin){
        var hostId = games.games[i].hostId; //Get the id of host of game
        console.log('Player connected to game data:', socket.id, params.name, hostId);
        players.addPlayer(hostId, socket.id, params.name, {score: 0, answer: 0}); //add player to game
        socket.join(params.pin); //Player is joining room based on pin

        var playersInGame = players.getPlayers(hostId); //Getting all players in game
        io.to(params.pin).emit('updatePlayerLobby', playersInGame);//Sending host player data to display
        gameFound = true; //Game has been found
      }
    }

    //If the game has not been found
    if(gameFound == false){
      console.log("no game found")
        socket.emit('noGameFound'); //Player is sent back to 'join' page because game was not found with pin
    }
  });

  //When a host or player leaves the site
  socket.on('disconnect', () => {
    console.log("a client has disconnected");
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
          var hostId = player.hostId; //Gets id of host of the game
          var game = games.getGame(hostId); //Gets game data with hostId
          var pin = game.pin; //Gets the pin of the game

          if(game.gameLive == false){
            console.log(players.getPlayer(socket.id).name, "has left the game")
            players.removePlayer(socket.id); //Removes player from players class
            var playersInGame = players.getPlayers(hostId); //Gets remaining players in game

            io.to(pin).emit('updatePlayerLobby', playersInGame); //Sends data to host to update screen
            socket.leave(pin); //Player is leaving the room
          }
        }
      }
  });

  //When the host starts the game
  socket.on('startGame', () => {
    var game = games.getGame(socket.id);//Get the game based on socket.id
    game.gameLive = true;
    socket.emit('gameStarted', game.hostId);//Tell player and host that game has started
  });
});
