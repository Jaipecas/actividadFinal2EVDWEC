class Game {
    
    constructor (id, player, date, result, firstMovement) {
        this.id = id;
        this.player = player;
        this.date = date;
        this.result = result;
        this.firstMovement = firstMovement
    }

    static async getGameData(token, gameId){
        try {
            const response = await fetch(`https://dwec-tres-en-raya.herokuapp.com/game/${gameId}`, {
                method: 'GET',
                headers: {
                    "authorization": `Bearer ${token}`
                }
            });
            
            if (response.status !== 200) return Promise.reject(response.status);
            
            //ACORDARSE DE HACER UNA MEJOR CONVERSION JSON-CLASS
            const json = await response.json();
            let game = new Game(json.id, json.player, json.date, json.result, json.first_movement);
            
            return game;
        } catch (error) {
            return Promise.reject(error.message);
        }
    }
}

export {
    Game
}