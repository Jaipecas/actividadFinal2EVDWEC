import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../list/list.css'
import '../common/common.css'
import 'regenerator-runtime/runtime';
import 'node-fetch';
import {
    Player
} from '../classes/player.js';
import {
    Game
} from '../classes/game';

const headerPlayerName = document.getElementById('player-name');
const loader = document.getElementById('loader');

function builgBoardTemplate(result) {
    let html = "";

    result.forEach(line => {
        html += "<div class='line'>";
        line.forEach(cell => {
            let result = "";
            switch (cell) {
                case 1:
                    result = "X";
                    break;
                case 2:
                    result = "O";
                    break;
                case 0:
                    result = "";
                    break;
            }
            html += `<div class='cell'>${result}</div>`
        })
        html += "</div>"
    })
    return html;
}


function buildGameTemplate(gamesData) {
    const gameList = document.getElementById('game-list');
    let html = "";

    if (gamesData.length !== undefined) {
        gamesData.forEach(game => {
            let date = new Date(game.date);

            html += " <ol class='game m-3'> ";
            html += "<div class='card p-1'>";
            html += " <h5 class='game-info'>"
            html += "Game #" + game.id
            html += " </h5>"
            html += " <div class='date'>"
            html += date.toLocaleString()
            html += "</div>"
            html += " </div>";
            html += " <div class='card mt-1 p-2 align-items-center'>"
            html += " <div class='preview'>"
            html += builgBoardTemplate(game.result)
            html += " </div>"
            html += " <button class='btn btn-smttt btn-primary view-button' data-game=" + game.id + ">View game</button>"
            html += " </div>"
            html += "</ol>";

        });
    } else {
        html = "<p>No Games</p>"
    }
    gameList.innerHTML = html;
}

async function loadPlayerData(token, id) {
    //get player data
    try {
        let player = await Player.getPlayerInfo(token, id);
        headerPlayerName.innerText = player.name;
    } catch (error) {
        console.log(error);
    }
}

function addButtonsListeners(gamesData) {
    const gameButtons = document.getElementsByTagName('button');
 
    gamesData.forEach(game => {
        gameButtons.map(button => button.addEventListener('click', () => location = `${location.href}game.html?game=${game.id}&movement=${game.firstMovement}`))
    })
}

async function loadGamesData(token, id) {
    try {
        let arrayGames = await Player.getPlayerGames(token, id);
        let gameArrayPromise = arrayGames.map(gameId => Game.getGameData(token, gameId));
        let gamesData = await Promise.all(gameArrayPromise);
        buildGameTemplate(gamesData);
        addButtonsListeners(gamesData);
    } catch (error) {
        console.log(error);
    }
}

async function loadWindow() {
    loader.classList.add('active');
    loadPlayerData(localStorage.token, localStorage.playerId);
    await loadGamesData(localStorage.token, localStorage.playerId);
    loader.classList.remove('active');
}

window.onload = loadWindow;