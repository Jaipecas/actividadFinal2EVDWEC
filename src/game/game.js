import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../common/common.css'
import '../game/game.css';
import 'regenerator-runtime/runtime';
import 'node-fetch';
import {
    Movement
} from '../classes/Movement';


const loader = document.getElementById('loader');
const beforeButton = document.getElementById('back');
const nextButton = document.getElementById('next');
const returnButton = document.getElementById('return');
const gameIdSpan = document.getElementById('game-id');

let loadedMovements = [];
let positionMovement = 0;

const getMovementCell = (movement) => document.querySelector(`[data-row = '${movement[0]}'][data-column = '${movement[1]}']`);

function insertMovementBoard(movement) {
    let cell = getMovementCell(movement);
    positionMovement % 2 === 0 ? cell.innerText = 'X' : cell.innerText = 'O';
}

function removeMovementBoard(movement) {
    let cell = getMovementCell(movement);
    cell.innerText = "";
}

function activeBeforeButton() {
    positionMovement < 1 ? beforeButton.disabled = true : beforeButton.disabled = false;
}

function activeNextButton(numberLoadedMovements) {
    numberLoadedMovements - 1 > positionMovement ? nextButton.disabled = false : nextButton.disabled = true;
}

function nextMovement() {
    positionMovement += 1;
    insertMovementBoard(loadedMovements[positionMovement])
    activeNextButton(loadedMovements.length);
    activeBeforeButton();
}

function beforeMovement() {
    removeMovementBoard(loadedMovements[positionMovement]);
    positionMovement -= 1;
    activeNextButton(loadedMovements.length);
    activeBeforeButton();
}

async function loadFirstMovement(game, firstMovement) {
    loader.classList.add('active');
    const movement = await Movement.getMovement(localStorage.token, game, firstMovement);
    loadedMovements.push(movement.movement);
    insertMovementBoard(loadedMovements[positionMovement]);
    loader.classList.remove('active');
    return movement.next;
}


async function loadMovements(game, firstMovement) {
    try {
        let movementActually;
        let nextMovement = await loadFirstMovement(game, firstMovement);

        while (nextMovement) {
            movementActually = await Movement.getMovement(localStorage.token, game, nextMovement);
            loadedMovements.push(movementActually.movement);
            nextMovement = movementActually.next;
            activeNextButton(loadedMovements.length);
        }
    } catch (error) {
        console.log(error);
    }
}

function addHandlers() {
    nextButton.addEventListener('click', nextMovement);
    beforeButton.addEventListener('click', beforeMovement);
    returnButton.addEventListener('click', () => history.back());
}

function loadWindow() {
    const urlParams = new URLSearchParams(location.search);
    addHandlers();
    gameIdSpan.innerText = urlParams.get('game');
    loadMovements(urlParams.get('game'), urlParams.get('movement'));
}


window.onload = loadWindow;