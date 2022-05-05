export async function createUser(name, email, username, password) {
    const user = JSON.stringify({name,email,username,password});
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
  
export async function readUser(id) {
    const user = JSON.stringify({id});
    const response = await fetch(`/user/read`, {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: user,
    });
    const data = await response.json();
    return data;
}

export async function updateUser(id, name, email, username, password) {
    const user = JSON.stringify({id,name,email,username,password});
    const response = await fetch(`/user/update`, {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: user,
    });
    const data = await response.json();
    return data;
}

export async function deleteUser(id) {
    const user = JSON.stringify({id});
    const response = await fetch(`/user/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: user,
    });
    const data = await response.json();
    return data;
}

export async function readAllUser() {
    const response = await fetch(`/user/all`, {
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