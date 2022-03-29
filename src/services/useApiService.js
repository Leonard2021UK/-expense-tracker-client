// Load LODASH, the full build.
// const _ = require('lodash');
import inMemoryJWT from "../utils/inMemoryJWT";
import {useSelector} from "react-redux";
import {UseCustomFetch} from "../customHooks/useCustomFetch";


export function useApiService() {

    const deleteData = async (data,url)=>{
        const fetchOption = {
            "method": "DELETE",
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": 'Bearer ' + inMemoryJWT.getToken(),
            }
        };

        const fetchUrl = url + "/" + data.id;
        return await UseCustomFetch(fetchUrl,fetchOption)
            .then( (response)=>{

                return response;
            })
    }

    const saveExpenseTracker = async (data)=>{
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
        return await UseCustomFetch(url,fetchOption)
            .then( (response)=>{
                return response;
            })
    }

    const deleteExpenseTracker = async (id)=>{
        const fetchOption = {
            "method": "DELETE",
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": 'Bearer ' + inMemoryJWT.getToken(),
            }
        };
        const url = process.env.REACT_APP_EXPENSES_TRACKER + "/" + id;
        return await UseCustomFetch(url,fetchOption)
            .then( (response)=>{
                return response;
            })
    }

    const saveItem = async (data)=>{
        const fetchOption = {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": 'Bearer ' + inMemoryJWT.getToken(),
            },
            "body": JSON.stringify(data)
        };
        const url = process.env.REACT_APP_ITEM;
        return await UseCustomFetch(url,fetchOption)
            .then( (response)=>{
                return response;
            })
    }

    const getAllItemCategories = async (data)=>{
        const fetchOption = {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": 'Bearer ' + inMemoryJWT.getToken(),
            }
        };
        const url = process.env.REACT_APP_ITEM_CATEGORY;
        return await UseCustomFetch(url,fetchOption)
            .then( (response)=>{
                return response;
            })
    }
    const saveItemCategory= async (data)=>{
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
        return await UseCustomFetch(url,fetchOption)
            .then( (response)=>{
                return response;
            })
    }

    const getAllItems = async (data)=>{
        const fetchOption = {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": 'Bearer ' + inMemoryJWT.getToken(),
            }
        };
        const url = process.env.REACT_APP_ITEM;
        return await UseCustomFetch(url,fetchOption)
            .then( (response)=>{
                return response;
            })
    }

    const saveUnitType = async (method,data = {})=>{
        const fetchOption = {
            "method": method,
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": 'Bearer ' + inMemoryJWT.getToken(),
            },
            "body": JSON.stringify(data)

        };

        const url = process.env.REACT_APP_UNIT_TYPE;
        return await UseCustomFetch(url,fetchOption)
            .then( (response)=>{
                return response;
            })
    }
    const getAllUnitTypes = async ()=>{
        const fetchOption = {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": 'Bearer ' + inMemoryJWT.getToken(),
            }
        };

        const url = process.env.REACT_APP_UNIT_TYPE;
        return await UseCustomFetch(url,fetchOption)
            .then( (response)=>{
                return response;
            })
    }
    const getAllPaymentTypes = async ()=>{
        const fetchOption = {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": 'Bearer ' + inMemoryJWT.getToken(),
            }
        };

        const url = process.env.REACT_APP_PAYMENT_TYPE;
        return await UseCustomFetch(url,fetchOption)
            .then( (response)=>{
                return response;
            })
    }


    const saveExpenseAddress = async (method,data = {})=>{
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
        return await UseCustomFetch(url,fetchOption)
            .then( (response)=>{
                return response;
            })
    }

    const getAllExpenseAddresses = async ()=>{
        const fetchOption = {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": 'Bearer ' + inMemoryJWT.getToken(),
            }
        };

        const url = process.env.REACT_APP_EXPENSE_ADDRESS;
        return await UseCustomFetch(url,fetchOption)
            .then( (response)=>{
                return response;
            })
    }

    const getAllExpenseTypes = async ()=>{
        const fetchOption = {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": 'Bearer ' + inMemoryJWT.getToken(),
            }
        };

        const url = process.env.REACT_APP_EXPENSE_TYPE;
        return await UseCustomFetch(url,fetchOption)
            .then( (response)=>{
                return response;
            })
    }

    const getInitData = async ()=>{
        const fetchOption = {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": 'Bearer ' + inMemoryJWT.getToken(),
            }
        };

        const url = process.env.REACT_APP_INIT_DATA;
        return await UseCustomFetch(url,fetchOption)
            .then( (response)=>{
                return response;
            })
    }



    const fetchMainCategory = async (method,data = {})=>{
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
        return await UseCustomFetch(url,fetchOption)
            .then( (response)=>{
                return response;
            })
    }

    const saveExpense = async (method,data = {})=>{
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
        return await UseCustomFetch(url,fetchOption)
            .then( (response)=>{
                return response;
            })
    }

    const saveExpenseType = async (method,data = {})=>{
        const fetchOption = {
            "method": method,
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": 'Bearer ' + inMemoryJWT.getToken(),
            },
            "body": JSON.stringify(data)
        };

        const url = process.env.REACT_APP_EXPENSE_TYPE
        return await UseCustomFetch(url,fetchOption)
            .then( (response)=>{
                return response;
            })
    }

    const savePaymentType = async (method,data = {})=>{
        const fetchOption = {
            "method": method,
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": 'Bearer ' + inMemoryJWT.getToken(),
            },
            "body": JSON.stringify(data)
        };

        const url = process.env.REACT_APP_PAYMENT_TYPE
        return await UseCustomFetch(url,fetchOption)
            .then( (response)=>{
                return response;
            })
    }

    const deleteExpense = async (id)=>{
        const fetchOption = {
            "method": "DELETE",
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": 'Bearer ' + inMemoryJWT.getToken(),
            }
        };

        const url = process.env.REACT_APP_EXPENSE + "/" + id;
        return await UseCustomFetch(url,fetchOption)
            .then( (response)=>{
                return response;
            })
    }

    return {
        savePaymentType,
        saveExpenseTracker,
        getAllUnitTypes,
        getAllPaymentTypes,
        getAllExpenseAddresses,
        getAllExpenseTypes,
        getInitData,
        fetchMainCategory,
        getAllItems,
        saveItemCategory,
        getAllItemCategories,
        saveItem,
        saveExpense,
        saveUnitType,
        saveExpenseAddress,
        saveExpenseType,
        deleteExpenseTracker,
        deleteData,
        deleteExpense

        // getJobRecordById,
        // getAllJobRegistration,
        // getMyBookings,
        // registerForAjob,
        // cancelJobRegistration,
        // updateJobRegistration,
        // updateJobRecordData,
        // archiveJobRecord

    }
}
