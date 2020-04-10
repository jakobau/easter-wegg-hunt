function hostGame(){
  var gamePin = Math.floor(Math.random()*90000) + 10000; //new pin for game
  window.location.href = "/create/?id="+gamePin;
}
