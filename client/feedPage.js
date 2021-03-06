import * as crud from './crud.js';

if(window.localStorage.getItem('user') === null){
    window.location.href = 'index.html';
}

const userEl = document.getElementById('user');
const prof = document.getElementById("prof");
const allPost = await crud.readAllPost();
const feedImg = document.getElementById('feedImg');
let count = allPost.length - 1;


async function loadFeed(){
    if (allPost.length > 0){
        if(count >= 0 && count < allPost.length){
            feedImg.src = `data:${allPost[count].post[1]};base64, ` + allPost[count].post[0];
            document.getElementById('description').innerHTML = allPost[count].post[2];
            document.getElementById('profileName').innerHTML = allPost[count].post[3];
            document.getElementById('date').innerHTML = allPost[count].post[4];
            const posterPFP = await crud.getUserInfo(allPost[count].email);
            if(posterPFP.pfp !== null){
                document.getElementById('pfp').src = `data:${posterPFP.pfp[0]};base64, ` + posterPFP.pfp[1];
            }
        }
    } else{
        feedImg.sr = "//:0";
    }
}
const user = await crud.getUserInfo(window.localStorage.getItem('user'));

await loadFeed();

userEl.innerHTML = "Welcome " + user.name + ".";

prof.addEventListener("click", () =>{
    window.location.href = "profile.html";
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

document.getElementById('sout').addEventListener('click', ()=>{
    window.localStorage.removeItem('user');
    window.location.href = 'index.html';
});