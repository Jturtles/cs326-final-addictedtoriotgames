//Need to make it so two forms can be submitted by one submit button

document.getElementById('fd').addEventListener("click", async(e) =>{
    window.location.href = 'feedPage.html';
});

document.getElementById('prof').addEventListener("click", async(e) =>{
    window.location.href = 'profile.html';
});

document.getElementById('sout').addEventListener("click", async(e) =>{
    window.location.href = 'index.html';
});

document.getElementById('pdelete').addEventListener('click', async(e) => {
    //await crud.deleteUser(); #waiting for for signing up users and displaying their names
    window.location.href = 'index.html'
});