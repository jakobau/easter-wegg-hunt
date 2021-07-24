function hostGame(){
  var gamePin = Math.floor(Math.random()*90000) + 10000; //new pin for game
  window.location.href = "/create/?id="+gamePin;
}

var x = document.getElementById("message");
if(window.location.href.indexOf("egghunt.jakobau.me") > -1){ 
  x.style.display = "block";
} else {
  x.style.display = "none";
}