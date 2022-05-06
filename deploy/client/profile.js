import * as crud from './crud.js';

async function loadFeed(){
    const res = await fetch('/getUser')
    return res.json();
}

const user = await loadFeed();
const userEl = document.getElementById('user');

document.getElementById('fd').addEventListener("click", async(e) =>{
    window.location.href = 'feedPage.html';
});

document.getElementById('sout').addEventListener("click", async(e) =>{
    window.location.href = 'index.html';
});

document.getElementById('prof').addEventListener("click", async(e) =>{
    window.location.href = 'profile.html';
});

document.getElementById('upload').addEventListener("click", async(e) =>{
    window.location.href = 'upload.html';
});


document.getElementById('pdelete').addEventListener('click', async(e) => {
    //await crud.deleteUser(); #waiting for for signing up users and displaying their names
    window.location.href = 'index.html'
});