import * as crud from './crud.js';
document.getElementById('profile_to_feed').addEventListener("click", async(e) =>{
    window.location.href = crud.p_to_f();
});