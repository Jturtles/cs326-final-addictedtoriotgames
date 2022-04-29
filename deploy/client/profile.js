import * as crud from './crud.js';
document.getElementById('fd').addEventListener("click", async(e) =>{
    window.location.href = 'feedPage.html';
});

document.getElementById('sout').addEventListener("click", async(e) =>{
    window.location.href = 'index.html';
});

document.getElementById('pdelete').addEventListener('click', async(e) => {
    //await crud.deleteUser(); #waiting for for signing up users and displaying their names
    window.location.href = 'index.html'
});