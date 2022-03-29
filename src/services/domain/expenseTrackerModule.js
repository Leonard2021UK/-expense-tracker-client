import inMemoryJWT from "../../utils/inMemoryJWT";
import {UseCustomFetch} from "../../customHooks/useCustomFetch";

export default function useExpenseTrackerModule() {

    const deleteExpenseTracker = async (id) => {
        const fetchOption = {
            "method": "DELETE",
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": 'Bearer ' + inMemoryJWT.getToken(),
            }
        };
        const url = process.env.REACT_APP_EXPENSES_TRACKER + "/" + id;
        return await UseCustomFetch(url, fetchOption)
            .then((response) => {
                return response;
            })
    }

    const saveExpenseTracker = async (data) => {
        const fetchOption = {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": 'Bearer ' + inMemoryJWT.getToken(),
            },
            "body": JSON.stringify(data)
        };
        const url = process.env.REACT_APP_EXPENSES_TRACKER;
        return await UseCustomFetch(url, fetchOption)
            .then((response) => {
                return response;
            })
    }

    return{
        deleteExpenseTracker,
        saveExpenseTracker
    }
}