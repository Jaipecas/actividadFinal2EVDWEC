import {
    fetchGET
} from "../common/common";
class Game {

    constructor(id, player, date, result, firstMovement) {
        this.id = id;
        this.player = player;
        this.date = date;
        this.result = result;
        this.firstMovement = firstMovement
    }

    static async getGameData(token, gameId) {
        const json = await fetchGET(`https://dwec-tres-en-raya.herokuapp.com/game/${gameId}`, token);
        return new Game(json.id, json.player, json.date, json.result, json.first_movement);
    }
}

export {
    Game
}