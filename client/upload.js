const uploadImage = document.getElementById('picUpload');

document.getElementById('email').value = window.localStorage.getItem('user');

document.getElementById('fd').addEventListener("click", async(e) =>{
    window.location.href = 'feedPage.html';
});

document.getElementById('prof').addEventListener("click", async(e) =>{
    window.location.href = 'profile.html';
});

document.getElementById('sout').addEventListener('click', ()=>{
    window.localStorage.removeItem('user');
    window.location.href = 'index.html';
});

document.getElementById('delete').addEventListener('click', () =>{
    window.location.href = 'delete.html';
});

// sending the image taken in to be extracted and stored in the database
uploadImage.onchange = evt => {
    const [file] = uploadImage.files;
    if(file){
        document.getElementById('uploadImg').src = URL.createObjectURL(file);
    }
}