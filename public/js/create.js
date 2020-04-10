var socket = io();
var params = jQuery.deparam(window.location.search);

socket.on('connect', function(){
    socket.emit('requestDbNames');//Get database names to display to user
    document.getElementById('players').value = "";

    //Tell server that it is host connection
    socket.emit('host-join', params);
});

socket.on('showGamePin', function(data){
   document.getElementById('gamePinText').innerHTML = data.pin;
   //window.location.href = "/create/?id="+data.hostid;
});

//Adds player's name to screen and updates player count
socket.on('updatePlayerLobby', function(data){

    document.getElementById('players').value = "";

    for(var i = 0; i < data.length; i++){
        document.getElementById('players').value += data[i].name + "\n";
    }
});

function startGame(){
    socket.emit('startGame');
}

function endGame(){
    window.location.href = "/";
}

//When server starts the game
socket.on('gameStarted', function(id){
    window.location.href="/create/game/" + "?id=" + id;
});

socket.on('noGameFound', function(){
   window.location.href = '../../';//Redirect user to 'join game' page
});
