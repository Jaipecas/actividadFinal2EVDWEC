import 'regenerator-runtime/runtime';

class Player {

    constructor(id, username, name) {
        this.id = id;
        this.username = username;
        this.name = name;
    }

    static async loginFetch(username, pass) {

        try {
            const response = await fetch('https://dwec-tres-en-raya.herokuapp.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'username': username,
                    'password': pass
                })
            });
            if (response.status === 401) return Promise.reject(`El usuario o la contraseña no son correctos`);
            if (response.status !== 200) return Promise.reject(`Error: ${response.status}`);
            const data = await response.json();
            return data;
        } catch (error) {
            return Promise.reject(error.message);
        }
    }

    static async getPlayerInfo(token, playerId) {
        try {
            const response = await fetch(`https://dwec-tres-en-raya.herokuapp.com/player/${playerId}`, {
                method: 'GET',
                headers: {
                    "authorization": `Bearer ${token}`
                }
            });
            if (response.status !== 200) return Promise.reject(response.status);
            
            const json = await response.json();

            let player = new Player(json.id, json.username, json.name);
            
            return player;
        } catch (error) {
            return Promise.reject(error.message);
        }
    }

     static async getPlayerGames(token, playerId) {
        try {
            const response = await fetch(`https://dwec-tres-en-raya.herokuapp.com/player/${playerId}/games`, {
                method: 'GET',
                headers: {
                    "authorization": `Bearer ${token}`
                }
            });
            if (response.status === 404) return Promise.reject(`Partidas no encontradas`);
            if (response.status !== 200) return Promise.reject(`Error: ${response.status}`);
            
            const data = await response.json();
            
            return data;
        } catch (error) {
            return Promise.reject(error.message);
        }
    }

}

export {
    Player
}