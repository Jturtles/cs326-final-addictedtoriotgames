import * as crud from './crud.js';

const signup = document.getElementById("signup");
const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

signup.addEventListener('click', async(e) => {
    const user = await crud.createUser(id, name, email, username, password);
})