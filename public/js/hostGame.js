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

socket.on('getTime', function(player){
    socket.emit('time', {
        player: player,
        time: time
    });
});

socket.on('showGamePin', function(data){
   document.getElementById('gamePinText').innerHTML = data.pin;
});
