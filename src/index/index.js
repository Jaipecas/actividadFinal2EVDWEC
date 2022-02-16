import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'regenerator-runtime/runtime';
import '../common/common.css'
import '../index/index.css';
import {
    Player
} from '../classes/player';

const pass = document.getElementById('password');
const username = document.getElementById('username');
const form = document.getElementsByTagName('form')[0];
const loader = document.getElementById('loader');
const errorMessage = document.getElementById('error');

function saveInStorage(token, playerId) {
    localStorage.clear();
    localStorage.setItem('token', token);
    localStorage.setItem('playerId', playerId);
}

function showLoginError(error) {
    errorMessage.innerText = error;
    errorMessage.classList.add('show');
    loader.classList.remove('active')
}

async function signIn(username, pass) {
    try {
        if (form.checkValidity()) {
            loader.classList.add('active')
            let loginData = await Player.loginFetch(username, pass);
            loader.classList.remove('active')
            form.classList.add('was-validated')
            saveInStorage(loginData.access_token, loginData.player_id);
            location = `${location.href}list.html?player=${loginData.player_id}`;
        }
    } catch (error) {
        showLoginError(error);
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    signIn(username.value, pass.value);
});