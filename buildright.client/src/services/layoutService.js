import { BASE_URL_LAYOUT } from "../util/constants";
import { fetchData, fetchOptions } from "./apiService";

export const getLayout = async (pageName) => {
    const options = fetchOptions();
    const { status, response } = await fetchData(BASE_URL_LAYOUT, `Layout/${pageName}`, options);

    if (!status) {
        console.error(response);
    } else {
        return response.layouts;
    }
};

export const getElement = async (id) => {
    const options = fetchOptions();
    const { status, response } = await fetchData(BASE_URL_LAYOUT, `Layout/elements/${id}`, options);

    if (!status) {
        console.error(response);
    } else {
        return response.layout;
    }
}

export const updateElement = async (props) => {
    const options = fetchOptions({ properties: props }, 'POST');
    const { status, response } = await fetchData(BASE_URL_LAYOUT, 'Layout', options);

    if (!status) {
        console.error(response);
    } else {
        return response.layout;
    }
}