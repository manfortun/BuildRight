import { BASE_URL_AUTH, BASE_URL_CONTENT } from "../util/constants";


export const fetchData = async (api, endpoint, options = {}) => {
    const url = `${api}/${endpoint}`;
    const response = await fetch(url, options);

    if (!response.ok) {
        let errorDetails;

        try {
            const errorResponse = await response.json();
            errorDetails = errorResponse.errors || 'Unknown error occurred.';
        } catch {
            errorDetails = 'Failed to parse error response.';
        }

        return { status: false, response: errorDetails };
    }

    return { status: true, response: await response.json() };
}

export const fetchOptions = (body, method = 'GET') => {
    return {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body === null ? null : JSON.stringify(body)
    };
}