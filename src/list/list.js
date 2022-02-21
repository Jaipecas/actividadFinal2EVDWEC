import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../common/common.css'
import '../list/list.css'
import 'regenerator-runtime/runtime';
import 'node-fetch';
import {
    redirectLocation
} from '../common/common';
import {
    Player
} from '../classes/Player.js';
import {
    Game
} from '../classes/Game';

const headerPlayerName = document.getElementById('player-name');
const loader = document.getElementById('loader');


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

function loadTemplate(dataList) {
    headerPlayerName.innerText = dataList[0].name;
    buildGameTemplate(dataList[1]);
    addButtonsListeners(dataList[1]);
}

async function getGamesData(token, id) {
    let arrayGames = await Player.getPlayerGames(token, id);
    let gameArrayPromise = arrayGames.map(gameId => Game.getGameData(token, gameId));
    return Promise.all(gameArrayPromise);
}

async function loadWindow() {
    try {
        let dataPromises = [];

        loader.classList.add('active');
        dataPromises.push(Player.getPlayerInfo(localStorage.token, localStorage.playerId));
        dataPromises.push(getGamesData(localStorage.token, localStorage.playerId));

        let dataList = await Promise.all(dataPromises);
        loadTemplate(dataList)
        loader.classList.remove('active');

    } catch (error) {
        console.log(error);
        if (error === 401) redirectLocation(location.href)
    }
}

window.onload = loadWindow;