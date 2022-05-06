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


document.getElementById('delete').addEventListener('click', async(e) => {
    await crud.deleteUser();
    window.location.href = 'index.html';
});