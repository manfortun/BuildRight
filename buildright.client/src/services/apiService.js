export const fetchData = async (api, endpoint, options = {}) => {
    const url = `${api}/${endpoint}`;

    const response = await fetch(url, options);

    if (!response.ok) {
        let statusText = response.statusText ? response.statusText : 'No response text.';
        return { status: false, response: `${statusText} (${response.status})` };
    }

    try {
        return { status: true, response: await response.json() };
    } catch {
        return { status: true, response: 'No response text.' };
    }
}

export const fetchOptions = (body, method = 'GET', headers = {'Content-Type': 'application/json'}) => {
    return {
        method,
        headers,
        body: body === null ? null : JSON.stringify(body)
    };
}