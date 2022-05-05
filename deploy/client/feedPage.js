import * as crud from './crud.js';

const prof = document.getElementById("prof");
const signout = document.getElementById("sout");

prof.addEventListener("click", () =>{
    window.location.href = "profile.html";
});

signout.addEventListener("click", () =>{
    window.location.href = "index.html";
});

document.getElementById('fd').addEventListener("click", async(e) =>{
    window.location.href = 'feedPage.html';
});

document.getElementById('upload').addEventListener("click", async(e) =>{
    window.location.href = 'upload.html';
});