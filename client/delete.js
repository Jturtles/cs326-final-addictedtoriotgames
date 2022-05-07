import * as crud from './crud.js';

document.getElementById("deleteAccount").addEventListener("click", async () => {
    await crud.deleteUser();
    window.location.href = 'index.html';
});

document.getElementById('upload').addEventListener("click", async(e) =>{
    window.location.href = 'upload.html';
});


document.getElementById('fd').addEventListener("click", async(e) =>{
    window.location.href = 'feedPage.html';
});

document.getElementById('prof').addEventListener("click", async(e) =>{
    window.location.href = 'profile.html';
});