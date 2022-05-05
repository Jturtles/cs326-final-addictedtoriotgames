import * as crud from './crud.js';

const log = document.getElementById("login");
const signup = document.getElementById("signup");

log.addEventListener("click", async () =>{
    const Email = document.getElementById('email').value;
    const Password = document.getElementById('password').value;
    const data = JSON.stringify({ Email, Password });
    console.log(Email, Password);
    const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  });
  let results = await response.json();
  if(results.length != 0){
    window.location.href = 'feedPage.html';
  } else {
    window.location.href = "index.html";
  }
});

signup.addEventListener("click", () =>{
    window.location.href = "signUp.html";
});