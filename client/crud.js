// getting the user to login to the webpage route
export async function readUser(email, password) {
    const user = JSON.stringify({email, password});
    const response = await fetch(`/login`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: user,
    });
    const data = await response.json();
    return data;
}

// deleting an entire user route 
export async function deleteUser(email) {
    const user = JSON.stringify({email});
    const res = await fetch('/user/delete', {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: user,
    });
}

// reading all the posts for the feedpage route
export async function readAllPost() {
    const response = await fetch(`/post/all`, {
        method: 'GET',
    });
    const data = await response.json();
    return data;
}

// getting the user info to load their data route
export async function getUserInfo(email){
    const user = JSON.stringify({email});
    const res = await fetch('/getUser', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: user,
    })
    return res.json();
}
