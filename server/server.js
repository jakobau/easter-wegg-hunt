const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {LiveGames} = require('./livegames');
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
    console.log("host-join");

    var isGame = false;
    //if game found in array
    for(var i = 0; i < games.getGames().length; i++){
      if(games.games[i].pin === data.id) { //game already created
        isGame = True;
      }
    }

    if (isGame) {
      //Sending game pin and hostid to host so they can display it for players to join
      socket.emit('showGamePin', {
        pin: games.games[i].pin
      });

      console.log('Host rejoin game');

    } else {
      var totalEggs = 15;
      var numEggList = new Array();
      for(var i=1; i<=totalEggs; i++){
        numEggList.push(i);
      }
      games.addGame(data.id, socket.id, false, numEggList, [], {gameid: data.id, eggsTotal: totalEggs, eggsFound: 0}); //Creates a game with pin and host id
      var game = games.getGame(socket.id); //Gets the game data
      console.log('Game Created with pin:', game.pin, socket.id);

      socket.join(game.pin);

      //Sending game pin and hostid to host so they can display it for players to join
      socket.emit('showGamePin', {
        pin: game.pin
      });
    }

    //else no game found in database
    /*}else{
        socket.emit('noGameFound');
    }*/
  });

  //When the host connects from the game view
  socket.on('host-join-game', (data) => {
    console.log("host-join-game");
    var oldHostId = data.id;
    var game = games.getGame(oldHostId); //Gets game with old host id

    socket.emit('showGamePin', {
        pin: game.pin
    });

    if(game){
        game.hostId = socket.id; //Changes the game host id to new host id
        console.log("hostid changed");
        socket.join(game.pin);
        var playerData = players.getPlayers(oldHostId); //Gets player in game
        for(var i = 0; i < Object.keys(players.players).length; i++){
            if(players.players[i].hostId == oldHostId){
                players.players[i].hostId = socket.id;
            }
        }

        var playerNum = players.getPlayers(socket.id);
        socket.emit('updateBoard', { //update host board
          playersInGame: playerNum.length,
          totalEggsLeft: (game.gameData.eggsTotal - game.gameData.eggsFound),
          allPlayers: playerNum
        });

        io.to(game.pin).emit('gameStartedPlayer'); //starts all players games

      }else{
        socket.emit('noGameFound'); //No game was found, redirect user
      }

      setTimeout(function() {
        console.log("game timer has run out!");
        if(game) { //exit game
          games.removeGame(socket.id);//Remove the game from games class
          console.log('Game ended with pin:', game.pin);

          var playersToRemove = players.getPlayers(game.hostId); //Getting all players in the game

          //remove each player in the game
          for(var i = 0; i < playersToRemove.length; i++){
              players.removePlayer(playersToRemove[i].playerId);
          }

          io.to(game.pin).emit('GameOver'); //Send player back to 'score' screen
          socket.leave(game.pin); //Socket is leaving room
        }
      }, 600000);
    });

  //When player connects for the first time
  socket.on('player-join', (params) => {
    console.log("player-join");
    var gameFound = false; //If a game is found with pin provided by player
    //For each game in the Games class
    for(var i = 0; i < games.games.length; i++){
      //If the pin is equal to one of the game's pin
      if(params.pin == games.games[i].pin){
        var hostId = games.games[i].hostId; //Get the id of host of game
        console.log('Player connected to game data:', socket.id, params.name, hostId);
        players.addPlayer(hostId, socket.id, socket.id, params.name, {score: 0}); //add player to game
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

  //When the player connects from game view
  socket.on('player-join-game', (data) => {
    var player = players.getPlayer(data.id);

    if(player) {
      console.log("player-join-game");
      var game = games.getGame(player.hostId);
      socket.join(game.pin);
      player.playerId = socket.id; //Update player id with socket id

      var playerData = players.getPlayers(game.hostId);
      socket.emit('playerGameData', playerData);

    } else { //player not registered or refreshed page

      console.log("player-rejoin-game");

      for(var i = 0; i < games.games.length; i++){
        //If the pin is equal to one of the game's pin
        if(data.pin == games.games[i].pin){
          var player = players.getPlayerFirstId(data.id);
          var hostId = player.hostId; //Get the id of host of game
          var game = games.getGame(hostId);

          socket.join(data.pin);
          player.playerIdFirst = data.id;
          player.playerId = socket.id;

          socket.emit('updatePlayerBoard', {eggnum: game.eggFoundList}); //remove egg from player

          var playerData = players.getPlayers(game.hostId);
          socket.emit('playerGameData', playerData);
        }
      }
    }
  });

  socket.on('playerFoundEgg', function(num){
    console.log("player found egg");
    var player = players.getPlayer(socket.id);
    var hostId = player.hostId;
    var playerNum = players.getPlayers(hostId);
    var game = games.getGame(hostId);

    console.log(game.gameLive, playerNum, players);

    var validEgg = false;
    if(game.gameLive == true){ //if the game is live
        for(var i = 0; i < game.eggList.length; i++){ //check if egg is in eggList
          if(game.eggList[i] === num) { //found egg id
            game.eggList.splice(i, 1); //remove eggid from list
            player.gameData.score += 1;
            game.gameData.eggsFound += 1;
            game.eggFoundList.push(num);

            var temp = new Array();
            temp.push(num)
            socket.emit('updatePlayerBoard', {eggnum: temp}); //remove egg from player
            socket.to(game.pin).emit('updatePlayerBoard', {eggnum: temp}); //remove egg from all other players

            var playerData = players.getPlayers(hostId);
            socket.emit('playerGameData', playerData);

            validEgg = true;
            console.log("found egg id, new score:", player.gameData.score);
            break; //exit loop
          }
        }
/*
        if(validEgg) {
          socket.emit('playerEggValid');
        } else {
          socket.emit('playerEggInvalid');
        }
*/
        //Checks if all eggs found
        if(game.gameData.eggsFound == game.gameData.eggsTotal){
          game.gameLive = false;
          //var playerData = players.getPlayers(game.hostId);
          socket.emit('GameOver'); //tell player game is over
          socket.to(game.pin).emit('GameOver'); //Tell everyone else and host that game is over
        }

        console.log("updating board");
        //update host screen of num players answered
        socket.to(hostId).emit('updateBoard', {
          playersInGame: playerNum.length,
          totalEggsLeft: (game.gameData.eggsTotal - game.gameData.eggsFound),
          allPlayers: playerNum
        });
      }
  });

  //When a host or player leaves the site
  socket.on('disconnect', () => {
    console.log("disconnect");
      var game = games.getGame(socket.id); //Finding game with socket.id
      //If a game hosted by that id is found, the socket disconnected is a host
      if(game){
        console.log("a host has disconnected");
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
            console.log("a player has disconnected");
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
    console.log("startGame");
    var game = games.getGame(socket.id);//Get the game based on socket.id
    game.gameLive = true;
    socket.emit('gameStarted', game.hostId);//Tell host that game has started
  });

  socket.on('time', function(data){
    console.log("time");
      var time = data.time / 20;
      time = time * 100;
      var playerid = data.player;
      var player = players.getPlayer(playerid);
      player.gameData.score += time;
  });
});
