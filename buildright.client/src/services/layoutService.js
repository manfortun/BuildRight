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

export const updateElement = async (props, parentId) => {
    const options = fetchOptions({ properties: props, parentId: parentId }, 'POST');
    const { status, response } = await fetchData(BASE_URL_LAYOUT, 'Layout', options);

    if (!status) {
        console.error(response);
    } else {
        return response.layout;
    }
}

export const getAvailableLayouts = async (name, type) => {
    const options = fetchOptions({ name: name, type: type }, 'POST');
    const { status, response } = await fetchData(BASE_URL_LAYOUT, 'Layout/Types', options);

    if (!status) {
        console.error(response);
    } else {
        return response.layouts;
    }
}