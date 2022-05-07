import * as crud from './crud.js';


const user = await crud.getUserInfo(window.localStorage.getItem('user'));
const pictures = document.getElementById('photoloc');
function loadProfile(){
    let count = 0;
    if(user.pictures.length > 6){
        count = 6;
    } else {
        count = user.pictures.length;
    }
    for(let i = 0; i < count; i++){
        const photoDiv = document.createElement('div');
        photoDiv.className = 'photo'
        const pic = document.createElement('img');
        pic.src = `data:${user.pictures[user.pictures.length - 1 - i][1]};base64, ` + user.pictures[user.pictures.length - 1 - i][0];
        photoDiv.appendChild(pic);
        pictures.appendChild(photoDiv);
    }
    if(user.pfp !== null){
        document.getElementById('pfp').src = `data:${user.pfp[0]};base64, ` + user.pfp[1];
    }
}

document.getElementById('username').innerHTML = user.name;
document.getElementById('name').innerHTML = user.realname;
document.getElementById('email').value = user.email;
loadProfile();
document.getElementById('fd').addEventListener("click", async(e) =>{
    window.location.href = 'feedPage.html';
});


document.getElementById('prof').addEventListener("click", async(e) =>{
    window.location.href = 'profile.html';
});

document.getElementById('upload').addEventListener("click", async(e) =>{
    window.location.href = 'upload.html';
});


document.getElementById('delete').addEventListener('click', async(e) => {
    window.location.href = 'delete.html';
});

document.getElementById('sout').addEventListener('click', ()=>{
    window.localStorage.removeItem('user');
    window.location.href = 'index.html';
});