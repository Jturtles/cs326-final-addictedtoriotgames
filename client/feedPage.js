import * as crud from './crud.js';

async function loadFeed(){
    const res = await fetch('/getUser')
    return res.json();
}

const user = await loadFeed();
const userEl = document.getElementById('user');
userEl.innerHTML = user.name;
const prof = document.getElementById("prof");
const signout = document.getElementById("sout");
const allPost = await crud.readAllPost();

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