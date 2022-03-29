import inMemoryJWT from "../../utils/inMemoryJWT.js";
import {UseCustomFetch} from "../../customHooks/useCustomFetch.js";

export default function useMainCategoryModule() {

    const fetchMainCategory = async (method, data = {}) => {
        const fetchOption = {
            "method": method,
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": 'Bearer ' + inMemoryJWT.getToken(),
            },
            "body": JSON.stringify(data)
        };

        const url = process.env.REACT_APP_MAIN_CATEGORY;
        return await UseCustomFetch(url, fetchOption)
            .then((response) => {
                return response;
            })
    }

    return{
        fetchMainCategory
    }
}