import { fetchGET } from "../common/common";
class Game {
    
    constructor (id, player, date, result, firstMovement) {
        this.id = id;
        this.player = player;
        this.date = date;
        this.result = result;
        this.firstMovement = firstMovement
    }

    static async getGameData(token, gameId){
        const result = await fetchGET(`https://dwec-tres-en-raya.herokuapp.com/game/${gameId}`, token);
        return new Game(result.id, result.player, result.date, result.result, result.first_movement);
    }
}

export {
    Game
}