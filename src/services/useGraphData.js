
import inMemoryJWT from "../utils/inMemoryJWT";
import {UseCustomFetch} from "../customHooks/useCustomFetch";



const getExpenseTrackerSum = async ()=>{
    const fetchOption = {
        "method": "GET",
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": 'Bearer ' + inMemoryJWT.getToken(),
        }
    };

    const url = process.env.REACT_APP_EXPENSES_TRACKER_SUM;
    return await UseCustomFetch(url,fetchOption)
        .then( (response)=>{
            return response;
        })
}
const getExpenseTrackerItemByCategoryPeriod = async ()=>{
    const fetchOption = {
        "method": "GET",
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": 'Bearer ' + inMemoryJWT.getToken(),
        }
    };

    const url = process.env.REACT_APP_ITEM_BY_CATEGORY_PERIOD_SUM;
    return await UseCustomFetch(url,fetchOption)
        .then( (response)=>{
            return response;
        })
}

const UseGraphService ={

        getExpenseTrackerSum,
    getExpenseTrackerItemByCategoryPeriod
}

export default UseGraphService;