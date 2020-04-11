var socket = io();
var params = jQuery.deparam(window.location.search); //Gets the id from url

var time = 20;

socket.on('connect', function() {
    //Tell server that it is host connection from game view
    socket.emit('host-join-game', params);
});

socket.on('noGameFound', function(){
   window.location.href = '../../';//Redirect user to 'join game' page
});

//onload function creating client-side countdown
function initializeClock(sec){
  var clock = document.getElementById("time");
  var timeinterval = setInterval(function(){
    var min = Math.floor(sec / 60);
    sec -= 1;
    if(sec<10) {
      clock.innerHTML = min + ':0' + sec;
    } else {
      clock.innerHTML = min + ':' + sec;
    }


    if(sec <= 0){
      clearInterval(timeinterval);
      gameOver();
    }
  },1000);
}

socket.on('showGamePin', function(data){
   document.getElementById('gamePinText').innerHTML = data.pin;
});

socket.on('updateBoard', function(data){
   document.getElementById('totalPlayers').innerHTML = data.playersInGame;
   document.getElementById('eggsLeft').innerHTML = data.totalEggsLeft;

   document.getElementById('scoreBoard').innerHTML = ""; //reset scoreboard
   for(var i=0; i<data.allPlayers.length; i++) {
     document.getElementById('scoreBoard').innerHTML += "<h5>" + data.allPlayers[i].name.toString() + " " + data.allPlayers[i].gameData.score.toString() + "</h5>"
   }
});

socket.on('GameOver', function(){
  gameOver();
});

function gameOver() {
  //document.getElementById("main").style.display = "none";
  //document.getElementById("time").style.display = "none";
  document.getElementById('message').style.display = "block";
  document.getElementById('back').style.display = "block";
  document.getElementById('message').innerHTML = "GAME OVER";
}
