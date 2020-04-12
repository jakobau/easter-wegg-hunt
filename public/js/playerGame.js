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

function changePage(page) {
  window.location.href = "../../pages/"+page+".html?id="+params.id;
}

socket.on('updatePlayerBoard', function(data) {
  for(var i=0; i < data.eggnum.length; i++) {
    document.getElementById('egg' + data.eggnum[i].toString()).style.display = "none";
  }
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
  document.getElementById("screen").style.display = "none";
  document.getElementById('message').style.display = "block";
  document.getElementById('back').style.display = "block";
  document.getElementById('message').innerHTML = "GAME OVER! Check the score board to see other results!";

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

function answerQ(num) {
  if(num == 1) {
    if(document.getElementById("1").value == "egg" || document.getElementById("1").value == "Egg") {
      document.getElementById("1").style.display = "none";
      document.getElementById("ans1").innerHTML = "egg";
      document.getElementById("check1").style.display = "none";
      //display egg!
      document.getElementById("divEgg1").style.display = "block";
    }
  }else if (num == 7) {
    if(document.getElementById(num).value == "piano" || document.getElementById(num).value == "Piano") {
      document.getElementById(num).style.display = "none";
      document.getElementById("ans"+num).innerHTML = "piano";
      document.getElementById("check"+num).style.display = "none";
      //display egg!
      document.getElementById("divEgg"+num).style.display = "block";
    }
  }else if (num == 12) {
    if(document.getElementById(num).value == "12345") {
      document.getElementById(num).style.display = "none";
      document.getElementById("ans"+num).innerHTML = "12345";
      document.getElementById("check"+num).style.display = "none";
      //display egg!
      document.getElementById("divEgg"+num).style.display = "block";
    }
  }
}

function includeHTML(name) {
  console.log("change html");
  //document.getElementById("screen").innerHTML = "<div id=\"" + name + "\"><div data-include=\"" + name + "\"></div></div>";
  document.getElementById("main").style.display = "none";
  document.getElementById("instagram").style.display = "block";
}

function showEgg(num) {
  document.getElementById("divEgg" + num).style.display = "block";
}

function backToMenu() {
  document.getElementById("main").style.display = "block";
  document.getElementById("instagram").style.display = "none";
}
