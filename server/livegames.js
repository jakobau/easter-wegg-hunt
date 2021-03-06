class LiveGames {
    constructor () {
        this.games = [];
    }

    addGame(pin, hostId, gameLive, eggList, eggFoundList, gameData){
        var game = {pin, hostId, gameLive, eggList, eggFoundList, gameData};
        this.games.push(game);
        return game;
    }

    removeGame(hostId){
        var game = this.getGame(hostId);

        if(game){
            this.games = this.games.filter((game) => game.hostId !== hostId);
        }
        return game;
    }

    getGame(hostId){
      return this.games.filter((game) => game.hostId === hostId)[0]
    }

    getGames(){
      return this.games;
    }
}

module.exports = {LiveGames};
