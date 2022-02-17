class Movement {

    constructor (movement, next) {
        this.movement = movement;
        this.next = next;
    }

    static async getMovement(token, gameId, move){
        try {
            const response = await fetch(`https://dwec-tres-en-raya.herokuapp.com/game/${gameId}/movements/${move}`, {
                method: 'GET',
                headers: {
                    "authorization": `Bearer ${token}`
                }
            });
            
            if (response.status !== 200) return Promise.reject(response.status);
            
            //ACORDARSE DE HACER UNA MEJOR CONVERSION JSON-CLASS
            const json = await response.json();
            let movement = new Movement(json.movement, json.next)
    
            return movement;
        } catch (error) {
            return Promise.reject(error.message);
        }
    }
}

export {
    Movement
}