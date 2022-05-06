//Need to make it so two forms can be submitted by one submit button
import * as crud from './crud.js';
//import fs from 'fs';
var fs = require('fs');

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file, { encoding: 'base64' });
    return bitmap;
    // convert binary data to base64 encoded string
    //return new Buffer(bitmap).toString('base64');
}

document.getElementById("submit").addEventListener("click", async(e) =>{
    console.log(document.getElementById("picUpload").value);
    console.log(document.getElementById("picUpload"));
    console.log(pic);
    let pic = base64_encode(document.getElementById("picUpload").value);
    const post = await crud.uploadPost(email,pic);
})


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
