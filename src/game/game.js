import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../game/game.css';
import '../common/common.css'
import 'regenerator-runtime/runtime';
import 'node-fetch';
import {
    Movement
} from '../classes/movement';

const urlParams = new URLSearchParams(location.search);
const gameIdSpan = document.getElementById('game-id');
let arrayMovements = [];

function insertMarkInBoard(movement, mark) {
    let cell = document.querySelector(`[data-row = '${movement[0]}'][data-column = '${movement[1]}']`);
    cell.innerText = mark;
}

async function loadArrayMovements() {
    try {
        let movementActually;
        let nextMovement = urlParams.get('movement');
        do {
            movementActually = await Movement.getMovement(localStorage.token, urlParams.get('game'), nextMovement);
            arrayMovements.push(movementActually.movement);
            nextMovement = movementActually.next;
        } while (nextMovement);

    } catch (error) {
        console.log(error);
        if (error === 401) location = location.origin;
    }
}

function loadWindow() {
    loadArrayMovements();
    gameIdSpan.innerText = urlParams.get('game');

}


window.onload = loadWindow;