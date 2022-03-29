import inMemoryJWT from "../../utils/inMemoryJWT.js";
import {UseCustomFetch} from "../../customHooks/useCustomFetch.js";

export default function useExpenseModule() {

    const getAllExpenseAddresses = async () => {
        const fetchOption = {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": 'Bearer ' + inMemoryJWT.getToken(),
            }
        };

        const url = process.env.REACT_APP_EXPENSE_ADDRESS;
        return await UseCustomFetch(url, fetchOption)
            .then((response) => {
                return response;
            })
    }

    const saveExpenseAddress = async (method, data = {}) => {
        const fetchOption = {
            "method": method,
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": 'Bearer ' + inMemoryJWT.getToken(),
            },
            "body": JSON.stringify(data)

        };

        const url = process.env.REACT_APP_EXPENSE_ADDRESS;
        return await UseCustomFetch(url, fetchOption)
            .then((response) => {
                return response;
            })
    }

    return{
        getAllExpenseAddresses,
        saveExpenseAddress
    }
}