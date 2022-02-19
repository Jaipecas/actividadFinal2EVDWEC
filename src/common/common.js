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

        if (response.status !== 200) return Promise.reject(`Error: ${response.status}`);
        
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
        if (response.status === 401) location = location.origin;
        if (response.status !== 200) return Promise.reject(`Error: ${response.status}`);

        const json = await response.json();
        return json;
    } catch (error) {
        return Promise.reject(error.message);
    }
}

export {
    fetchPOST,
    fetchGET
}