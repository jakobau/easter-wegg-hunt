var socket = io();
var params = jQuery.deparam(window.location.search); //Gets the id from url

var name;
var score = 0;

socket.on('connect', function() {
    //Tell server that it is host connection from game view
    socket.emit('player-join-game', params);
});

function foundEgg(num) {
  socket.emit('playerFoundEgg', num);
}

socket.on('updatePlayerBoard', function(data) {
  document.getElementById('egg' + data.eggnum.toString()).style.display = "none";
});

socket.on('playerGameData', function(data) {
   for(var i = 0; i < data.length; i++){
       if(data[i].playerId == socket.id){
           document.getElementById('nameText').innerHTML = "Name: " + data[i].name;
           document.getElementById('scoreText').innerHTML = "Score: " + data[i].gameData.score;
       }
   }
});

socket.on('GameOver', function(data) {
  document.getElementById("main").style.display = "none";
  document.getElementById('message').style.display = "block";
  document.getElementById('back').style.display = "block";
  document.getElementById('message').innerHTML = "GAME OVER";
});

socket.on('noGameFound', function() {
  window.location.href = '../../';//Redirect user to 'join game' page
});

socket.on('hostDisconnect', function() {
  document.getElementsByTagName("main").style.display = "none";
  document.getElementById('message').style.display = "block";
  document.getElementById('back').style.display = "block";
  document.getElementById('message').innerHTML = "Host disconnected";
  //window.location.href = "../../";
});
