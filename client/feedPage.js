import * as crud from './crud.js';

const userEl = document.getElementById('user');
const prof = document.getElementById("prof");
const signout = document.getElementById("sout");
const allPost = await crud.readAllPost();
const feedImg = document.getElementById('feedImg');
let count = allPost.length - 1;

function loadFeed(){
    if (allPost.length > 0){
        if(count >= 0 && count < allPost.length){
            feedImg.src = `data:${allPost[count].post[1]};base64, ` + allPost[count].post[0];
            document.getElementById('description').innerHTML = allPost[count].post[2];
            document.getElementById('profileName').innerHTML = allPost[count].post[3];
            document.getElementById('date').innerHTML = allPost[count].post[4];
        }
    } else{
        feedImg.sr = "//:0";
    }
}
const user = await crud.getUserInfo();

loadFeed();

userEl.innerHTML = user.name;

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

document.getElementById('next').addEventListener('click', () =>{
    if(count >= 1){
        count -= 1;
    }
    loadFeed()
});

document.getElementById('previous').addEventListener('click', () =>{
    if(count < allPost.length-1){
        count += 1;
    }
    loadFeed()
});