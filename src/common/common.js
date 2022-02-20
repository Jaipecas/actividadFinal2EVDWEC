import fetch from 'node-fetch';

async function fetchPOST(url, contentType, body) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': contentType
            },
            body: JSON.stringify(body)
        });
        if (response.status === 401) return Promise.reject('El usuario o constraseña no son válidos');
        if (response.status !== 200) return Promise.reject(response.status);

        const data = await response.json();

        return data;
    } catch (error) {
        return Promise.reject(error.message);
    }
}

async function fetchGET(url, token) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "authorization": `Bearer ${token}`
            }
        });
        if (response.status !== 200) return Promise.reject(response.status);

        const data = await response.json();

        return data;
    } catch (error) {
        return Promise.reject(error.message);
    }
}

function redirectLocation(windowLocation) {
    localStorage.setItem('lastWindow', windowLocation);
    location = location.origin;
}

export {
    fetchPOST,
    fetchGET
}

export {
    redirectLocation
}