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
let gamesData;

function buildGameInfoTemplate(id, date) {
    let html = "";

    html += "<div class='card p-1'>";
    html += " <h5 class='game-info'>";
    html += "Game #" + id;
    html += " </h5>";
    html += " <div class='date'>";
    html += date;
    html += "</div>";
    html += " </div>";

    return html;
}

function builgBoardTemplate(result, id) {
    let html = "";

    html += " <div class='card mt-1 p-2 align-items-center'>";
    html += " <div class='preview'>";

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

    html += " </div>";
    html += " <button class='btn btn-smttt btn-primary view-button' data-game=" + id + ">View game</button>";
    html += " </div>";
    return html;
}

function buildGameTemplate(gamesData) {
    const gameList = document.getElementById('game-list');
    let html = "";

    if (gamesData.length !== 0) {
        gamesData.forEach(game => {
            let date = new Date(game.date);

            html += " <ol class='game m-3'> ";
            html += buildGameInfoTemplate(game.id, date.toLocaleString());
            html += builgBoardTemplate(game.result, game.id)
            html += "</ol>";
        });
    } else {
        html = "<p>No Games</p>"
    }
    gameList.innerHTML = html;
}

function addButtonsListeners(gamesData) {
    let gameButtons = document.getElementsByTagName('button');
    let gameButtonsArray = Array.from(gameButtons);

    gameButtonsArray.forEach(button => {
        button.addEventListener('click', (button) => {
            const gameIdClicked = button.target.dataset.game;
            const gameCliked = gamesData.find(game => game.id == gameIdClicked)
            location = `game.html?game=${gameIdClicked}&movement=${gameCliked.firstMovement}`
        })
    })
}

async function loadPlayerData(token, id) {
    try {
        let player = await Player.getPlayerInfo(token, id);
        headerPlayerName.innerText = player.name;
    } catch (error) {
        console.log(error);
        if (error === 401) location = location.origin;
    }
}

async function loadGamesData(token, id) {
    try {
        let arrayGames = await Player.getPlayerGames(token, id);
        let gameArrayPromise = arrayGames.map(gameId => Game.getGameData(token, gameId));
        gamesData = await Promise.all(gameArrayPromise);

        buildGameTemplate(gamesData);
        addButtonsListeners(gamesData);
    } catch (error) {
        console.log(error);
        if (error === 401) location = location.origin;
    }
}
//quiza cambiar 
async function loadWindow() {
    loader.classList.add('active');
    loadPlayerData(localStorage.token, localStorage.playerId);
    await loadGamesData(localStorage.token, localStorage.playerId);
    loader.classList.remove('active');
}

window.onload = loadWindow;