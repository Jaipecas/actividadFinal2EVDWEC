import 'regenerator-runtime/runtime';
import {
    fetchPOST,
    fetchGET
} from '../common/common';

class Player {

    constructor(id, username, name) {
        this.id = id;
        this.username = username;
        this.name = name;
    }

    static async loginFetch(username, pass) {
        return fetchPOST('https://dwec-tres-en-raya.herokuapp.com/login', 'application/json', {
            'username': username,
            'password': pass
        })
    }

    static async getPlayerInfo(token, playerId) {
        const json = await fetchGET(`https://dwec-tres-en-raya.herokuapp.com/player/${playerId}`, token);
        return new Player(json.id, json.username, json.name);
    }

    static async getPlayerGames(token, playerId) {
        return fetchGET(`https://dwec-tres-en-raya.herokuapp.com/player/${playerId}/games`, token);
    }

}

export {
    Player
}