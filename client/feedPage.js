import * as crud from './crud.js';

async function getUserInfo(){
    const res = await fetch('/getUser')
    return res.json();
}

const userEl = document.getElementById('user');
const prof = document.getElementById("prof");
const signout = document.getElementById("sout");
const allPost = await crud.readAllPost();
const feedImg = document.getElementById('feedImg');
let count = 0

function loadFeed(){
    if (allPost.length > 0){
        if(count >= 0 && count < allPost.length){
            feedImg.src = `data:${allPost[count].post[1]};base64, ` + allPost[count].post[0];
        }
    } else{
        feedImg.sr = "//:0";
    }
}
const user = await getUserInfo();

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
    if(count < allPost.length-1){
        count += 1;
    }
    loadFeed()
});

document.getElementById('previous').addEventListener('click', () =>{
    if(count >= 1){
        count -= 1;
    }
    loadFeed()
});