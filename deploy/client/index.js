import * as crud from './crud.js';

const log = document.getElementById("login");
const signup = document.getElementById("signup");
signup.addEventListener("click", () =>{
    window.location.href = "signUp.html";
});

log.addEventListener('click', async () => {

    const val = await crud.readUser(document.getElementById('email').value, document.getElementById('password').value);
    console.log(val);
    if(val === null){
        alert("Incorrect Login info");
    } else{
        window.localStorage.setItem('user', val.email);
        window.location.href = 'feedPage.html';
    }

});