import { fetchGET } from "../common/common";

class Movement {

    constructor (movement, next) {
        this.movement = movement;
        this.next = next;
    }

    static async getMovement(token, gameId, move){
        const json = await fetchGET(`https://dwec-tres-en-raya.herokuapp.com/game/${gameId}/movements/${move}`, token);
        return new Movement(json.movement, json.next);
    }
}

export {
    Movement
}