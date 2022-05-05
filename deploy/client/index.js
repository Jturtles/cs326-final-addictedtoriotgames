import * as crud from './crud.js';

const log = document.getElementById("login");
const signup = document.getElementById("signup");
signup.addEventListener("click", () =>{
    window.location.href = "signUp.html";
});