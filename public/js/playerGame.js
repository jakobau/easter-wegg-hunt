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
      //display egg!
      document.getElementById("divEgg"+num).style.display = "block";
      updateQuestion(num);
    }
  }else if (num == 7) {
    if(document.getElementById(num).value == "piano" || document.getElementById(num).value == "Piano") {
      //display egg!
      document.getElementById("divEgg"+num).style.display = "block";
      updateQuestion(num);
    }
  }else if (num == 12) {
    if(document.getElementById(num).value == "12345") {
      //display egg!
      document.getElementById("divEgg"+num).style.display = "block";
      updateQuestion(num);
    }
  }else if (num == 17) {
    if(document.getElementById(num).value == "breath" || document.getElementById(num).value == "Breath") {
      //display egg!
      document.getElementById("divEgg"+num).style.display = "block";
      updateQuestion(num);
    }
  }else if (num == 18) {
    if(document.getElementById(num).value == "hole" || document.getElementById(num).value == "Hole") {
      //display egg!
      document.getElementById("divEgg"+num).style.display = "block";
      updateQuestion(num);
    }
  }else if (num == 22) {
    if(document.getElementById(num).value == "name" || document.getElementById(num).value == "Name") {
      //display egg!
      document.getElementById("divEgg"+num).style.display = "block";
      updateQuestion(num);
    }
  }else if (num == 23) {
    if(document.getElementById(num).value == "cold" || document.getElementById(num).value == "Cold") {
      //display egg!
      document.getElementById("divEgg"+num).style.display = "block";
      updateQuestion(num);
    }
  }else if (num == 26) {
    if(document.getElementById(num).value == "coin" || document.getElementById(num).value == "Coin") {
      //display egg!
      document.getElementById("divEgg"+num).style.display = "block";
      updateQuestion(num);
    }
  }else if (num == 27) {
    if(document.getElementById(num).value == "library" || document.getElementById(num).value == "Library") {
      //display egg!
      document.getElementById("divEgg"+num).style.display = "block";
      updateQuestion(num);
    }
  }else if (num == 33) {
    if(document.getElementById(num).value == "light" || document.getElementById(num).value == "Light") {
      //display egg!
      document.getElementById("divEgg"+num).style.display = "block";
      updateQuestion(num);
    }
  }else if (num == 38) {
    if(document.getElementById(num).value == "18") {
      //display egg!
      document.getElementById("divEgg"+num).style.display = "block";
      updateQuestion(num);
    }
  }
}

function updateQuestion(num) {
  document.getElementById(num).style.display = "none";
  document.getElementById("ans"+num).innerHTML = "name";
  document.getElementById("check"+num).style.display = "none";
  socket.emit('playerSolvedQuestion', {
    num: num,
    pin: params.pin
  });
}

socket.on('updatePlayerQuestion', function(data) {
  document.getElementById(data.num).style.display = "none";
  document.getElementById("ans"+data.num).innerHTML = "name";
  document.getElementById("check"+data.num).style.display = "none";
});

function includeHTML(name) {
  //document.getElementById("screen").innerHTML = "<div id=\"" + name + "\"><div data-include=\"" + name + "\"></div></div>";
  document.getElementById("main").style.display = "none";
  document.getElementById(name).style.display = "block";
}

function showEgg(num) {
  document.getElementById("divEgg" + num).style.display = "block";
}

function backToMenu(name) {
  document.getElementById("main").style.display = "block";
  document.getElementById(name).style.display = "none";
}
