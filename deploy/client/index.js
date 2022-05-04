import * as crud from './crud.js';

const log = document.getElementById("login");
const signup = document.getElementById("signup");

log.addEventListener("click", () =>{
    window.location.href = "feedPage.html";
});

signup.addEventListener("click", () =>{
    window.location.href = "signUp.html";
});