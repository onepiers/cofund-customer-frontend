export async function login(token) {
    return fetch('/api/auth', {
        method: "POST", headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({token})
    }).then(response => {
        return response.json()
    }).then(data => {
        return data.token;
    });
}

export async function getEntrepreneur(token) {
    return fetch('/api/entrepreneurs/me', {
        method: "GET", headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${token}`,
        }
    }).then(response => {
        return response.json()
    });
}

export async function getAmount(id, token) {
    return fetch(`/api/entrepreneurs/${id}/sum`, {
        method: "GET", headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${token}`,
        }
    }).then(response => {
        return response.json()
    });
}

export async function updateEntrepreneur(id, token, data) {
    return fetch(`/api/entrepreneurs/${id}`, {
        method: "PUT", headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data)
    }).then((response) => {
        return response.json();
    });
}