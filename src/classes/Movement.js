import { fetchGET } from "../common/common";

class Movement {

    constructor (movement, next) {
        this.movement = movement;
        this.next = next;
    }

    static async getMovement(token, gameId, move){
        const result = await fetchGET(`https://dwec-tres-en-raya.herokuapp.com/game/${gameId}/movements/${move}`, token);
        return new Movement(result.movement, result.next);
    }
}

export {
    Movement
}