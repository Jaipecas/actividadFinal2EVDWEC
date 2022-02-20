import { fetchGET } from "../common/common";

class Movement {

    constructor (movement, next) {
        this.movement = movement;
        this.next = next;
    }

    static async getMovement(token, gameId, move){
        const response = await fetchGET(`https://dwec-tres-en-raya.herokuapp.com/game/${gameId}/movements/${move}`, token);
        const json = await response.json();
        return new Movement(json.movement, json.next);
    }
}

export {
    Movement
}