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
        const response = await fetchGET(`https://dwec-tres-en-raya.herokuapp.com/game/${gameId}`, token);
        const json = await response.json();
        return new Game(json.id, json.player, json.date, json.result, json.first_movement);
    }
}

export {
    Game
}