import * as crud from './crud.js';

const prof = document.getElementById("profile");
const signout = documet.getElementById("signout");

prof.addEventListener("click", () =>{
    window.location.href = "profile.html";
});

signout.addEventListener("click", () =>{
    window.location.href = "signUp.html";
});