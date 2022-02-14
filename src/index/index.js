import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'regenerator-runtime/runtime';
import '../index/index.css'
import {
    Player
} from '../classes/player';

//traer los elementos necesarios para la autentucación

const pass = document.getElementById('password');
const username = document.getElementById('username');
const form = document.getElementsByTagName('form')[0];
//const loader = document.getElementById('loader');
const errorMessage = document.getElementById('error');

let loginData;

function showLoginError(error) {
    errorMessage.innerText = error;
    errorMessage.classList.add('show');
}

async function signIn(username, pass) {

    try {
        if (form.checkValidity()) {
            //falta avtivar el loader
            //loader.classList.add('active')
            loginData = await Player.loginFetch(username, pass);
            //falta desactivar el loader
            form.classList.add('was-validated')
        }
    } catch (error) {
        showLoginError(error);
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    signIn(username.value, pass.value);
});