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