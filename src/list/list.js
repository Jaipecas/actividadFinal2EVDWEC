import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../list/list.css'
import 'regenerator-runtime/runtime';
import 'node-fetch';
import {
    Player
} from '../classes/player.js';
import {
    Game
} from '../classes/game';

const headerPlayerName = document.getElementById('player-name');

function buildGameTemplate(gamesData) {
    const gameList = document.getElementById('game-list');
    let html = "";
    
    gamesData.forEach(game => {
        html += " <ol class='game m-3'> " +
            "<div class='card p-1'>" +
            " <h5 class='game-info'>" +
            "Game " + game.id +
            " </h5>" +
            " <div class='date'>" +
            game.date +
            "</div>" +
            " </div>" +
            "</ol>"
    });

    gameList.innerHTML = html;
}

function buildGameInfoCard() {

}

async function signIn(username, pass) {
    try {
        let loginData = await Player.loginFetch(username, pass);
        return loginData
    } catch (error) {
        console.log(error);
    }
}

async function loadPlayerData(token, id) {
    //get player data
    let player = await Player.getPlayerInfo(token, id);
    headerPlayerName.innerText = player.name;
}


async function loadGamesData(token, id) {
    //get player id games
    let arrayGames = await Player.getPlayerGames(token, id);
    console.log(arrayGames);
    //get games data
    let gameArrayPromise = arrayGames.map(gameId => Game.getGameData(token, gameId));
    let gamesData = await Promise.all(gameArrayPromise);
    
    buildGameTemplate(gamesData);
}

async function loadWindow() {
    try {
        //get token and id
        let loginData = await signIn('player1', 'pass1');
        console.log(loginData);

        loadPlayerData(loginData.access_token, loginData.player_id);
        loadGamesData(loginData.access_token, loginData.player_id);

    } catch (error) {
        console.log('ERROR CAPTURADO' + error);
    }

}

window.onload = loadWindow;