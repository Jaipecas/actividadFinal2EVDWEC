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
        if (response.status === 401) throw Error('El usuario o constraseña no son válidos');
        if (response.status !== 200) throw Error(response.status);

        const data = await response.json();

        return data;
    } catch (error) {
        return Error(error.message);
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
        if (response.status === 401) location = location.origin;
        if (response.status !== 200) throw Error(response.status);

        const data = await response.json();

        return data;
    } catch (error) {
        return Error(error.message);
    }
}

export {
    fetchPOST,
    fetchGET
}