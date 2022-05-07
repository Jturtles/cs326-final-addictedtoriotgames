export async function createUser(name, email, username, password, pictures) {
    const user = JSON.stringify({name,email,username,password, pictures});
    const response = await fetch(`/user/create`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: user,
    }
    );
    const data = await response.json();
    return data;
}
  
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

  
export async function readUserPosts(email) {
    const user = JSON.stringify({email});
    const response = await fetch(`/user/read/posts`, {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: user,
    });
    const data = await response.json();
    return data;
}

export async function uploadPost(email, post) {
    const user = JSON.stringify({email, post});
    const response = await fetch(`/user/upload`, {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: user,
    });
    const data = await response.json();
    return data;
}

export async function deleteUser(email) {
    const user = JSON.stringify({email});
    const res = await fetch('/user/delete', {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: user,
    })
    return res.json();
}

export async function readAllUser() {
    const response = await fetch(`/user/all`, {
        method: 'GET',
    });
    const data = await response.json();
    return data;
}

export async function readAllPost() {
    const response = await fetch(`/post/all`, {
        method: 'GET',
    });
    const data = await response.json();
    return data;
}

export async function p_to_f(){
    const response = await fetch('/user/profile/feed', {
        method: 'GET',
    });
    const data = await response.json();
    return data;
}

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

export async function logout(){
    await fetch('/logout');
}