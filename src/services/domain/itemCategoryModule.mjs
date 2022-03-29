import inMemoryJWT from "../../utils/inMemoryJWT.js";
import {UseCustomFetch} from "../../customHooks/useCustomFetch.js";

export default function useItemCategoryModule() {

    const saveItemCategory = async (data) => {
        const fetchOption = {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": 'Bearer ' + inMemoryJWT.getToken(),
            },
            "body": JSON.stringify(data)
        };
        const url = process.env.REACT_APP_ITEM_CATEGORY;
        return await UseCustomFetch(url, fetchOption)
            .then((response) => {
                return response;
            })
    }

    const getAllItemCategories = async (data) => {
        const fetchOption = {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": 'Bearer ' + inMemoryJWT.getToken(),
            }
        };
        const url = process.env.REACT_APP_ITEM_CATEGORY;
        return await UseCustomFetch(url, fetchOption)
            .then((response) => {
                return response;
            })
    }

    return{
        saveItemCategory,
        getAllItemCategories
    }
}