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
    
if (allPost.length > 0){
    feedImg.src = allPost[0].post;
}
const user = await getUserInfo();
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