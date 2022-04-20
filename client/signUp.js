import * as crud from './crud.js';

const signup = document.getElementsById("signup");
const name = document.getElementsById("name").value;
const email = document.getElementsById("email").value;
const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

signup.addEventListener('click', async(e) => {
    const user = await crud.createUser(id, name, email, username, password);
})