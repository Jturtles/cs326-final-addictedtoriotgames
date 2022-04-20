export async function createUser(id, name, email, username, password) {
    const response = await fetch(
        `/user/create?id=${id}&name=${name}&email=${email}&username=${username}&password=${password}`,
        {
        method: 'POST',
        }
    );
    const data = await response.json();
    return data;
}
  
export async function readUser(id) {
    const response = await fetch(`/user/read?id=${id}`, {
        method: 'GET',
    });
    const data = await response.json();
    return data;
}

export async function updateUser(id, name, email, username, password) {
    const response = await fetch(
        `/user/update?id=${id}&name=${name}&email=${email}&username=${username}&password=${password}`,
        {
        method: 'PUT',
        }
    );
    const data = await response.json();
    return data;
}

export async function deleteUser(id) {
    const response = await fetch(`/user/delete?id=${id}`, {
        method: 'DELETE',
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