import inMemoryJWT from "../../utils/inMemoryJWT.js";
import {UseCustomFetch} from "../../customHooks/useCustomFetch.js";

export default function useExpenseModule() {

    const saveExpense = async (method, data = {}) => {
        const fetchOption = {
            "method": method,
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": 'Bearer ' + inMemoryJWT.getToken(),
            },
            "body": JSON.stringify(data)
        };

        const url = process.env.REACT_APP_EXPENSE
        return await UseCustomFetch(url, fetchOption)
            .then((response) => {
                return response;
            })
    }

    const deleteExpense = async (id) => {
        const fetchOption = {
            "method": "DELETE",
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": 'Bearer ' + inMemoryJWT.getToken(),
            }
        };

        const url = process.env.REACT_APP_EXPENSE + "/" + id;
        return await UseCustomFetch(url, fetchOption)
            .then((response) => {
                return response;
            })
    }

    return{
        saveExpense,
        deleteExpense
    }
}