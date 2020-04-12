class Players {
  constructor () {
      this.players = [];
  }
  addPlayer(hostId, playerId, playerIdFirst, name, gameData){
      var player = {hostId, playerId, playerIdFirst, name, gameData};
      this.players.push(player);
      return player;
  }
  removePlayer(playerId){
    var player = this.getPlayer(playerId);

    if(player){
      this.players = this.players.filter((player) => player.playerId !== playerId);
    }
    return player;
  }
  getPlayer(playerId){
    return this.players.filter((player) => player.playerId === playerId)[0]
  }
  getPlayerFirstId(playerId){
    return this.players.filter((player) => player.playerIdFirst === playerId)[0]
  }
  getPlayers(hostId){
    return this.players.filter((player) => player.hostId === hostId);
  }
}

module.exports = {Players};
