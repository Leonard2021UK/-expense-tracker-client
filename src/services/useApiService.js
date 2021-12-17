// Load LODASH, the full build.
// const _ = require('lodash');
import inMemoryJWT from "../utils/inMemoryJWT";
import {useSelector} from "react-redux";
import {UseCustomFetch} from "../customHooks/useCustomFetch";


export function useApiService() {


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
        console.log(data)
        const url = process.env.REACT_APP_EXPENSES_TRACKER;
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
        console.log(data)
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
        console.log(data)
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
        console.log(data)
        const url = process.env.REACT_APP_ITEM;
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
        console.log(data)
        const url = process.env.REACT_APP_ITEM;
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
        console.log("INFECHT")
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
    // const getJobRecordById = async (jobRecord)=>{
    //     console.log("jobrecord to update ", jobRecord);
    //     const fetchOption = {
    //         "method": "GET",
    //         "headers": {
    //             "Content-Type": "application/hal+json",
    //             "Accept": "application/hal+json",
    //             "Authorization": 'Bearer ' + rAuthUserInfo.userAccessToken,
    //         }
    //     };
    //     //           http://localhost:8085/api/v1/jobrecords
    //     // const url = process.env.REACT_APP_API_GET_JOBRECORD+"?id=" + jobRecord.id;
    //
    //     const url = jobRecord["_links"]["self"]["href"];
    //
    //     // const url = "http:localhost:8085/jobrecord?id=10"
    //     return await fetch(url,fetchOption)
    //         .then(async (response)=>{
    //             return response;
    //         })
    // }

    // const registerForAjob = async (jobRecord)=>{
    //     console.log("jobrecord to register :", jobRecord);
    //     const fetchOption = {
    //         "method": "POST",
    //         "headers": {
    //             "Content-Type": "application/hal+json",
    //             "Accept": "application/hal+json",
    //             "Authorization": 'Bearer ' + rAuthUserInfo.userAccessToken,
    //         }
    //     };
    //     //           http://localhost:8085/api/v1/jobrecords
    //     const url = process.env.REACT_APP_REGISTER_FOR_JOB+"/" + jobRecord.jobRecord.id;
    //     // const url = jobRecord["_links"]["register"]["href"];
    //     // let url = "http://localhost:8080/api/v1/registertoajob/"+jobRecord.jobRecord.id
    //     // const url = "http:localhost:8085/jobrecord?id=10"
    //     // because of cors the port number must be repleaced
    //     console.log("register url :", url);
    //
    //     return await fetch(url,fetchOption);
    // }
    // //TODO in productio use HATEOAS links
    // const cancelJobRegistration = async (jobRecordEmployee)=>{
    //     console.log("JOBRECORDEMPLOYEE ", jobRecordEmployee)
    //     const fetchOption = {
    //         "method": "DELETE",
    //         "headers": {
    //             "Content-Type": "application/hal+json",
    //             "Accept": "application/hal+json",
    //             "Authorization": 'Bearer ' + rAuthUserInfo.userAccessToken,
    //         }
    //     };
    //     //           http://localhost:8085/api/v1/jobrecords
    //     const url = process.env.REACT_APP_CANCEL_JOB_REGISTRATION+"/" + jobRecordEmployee.id.jobRecordId + "/" + jobRecordEmployee.id.oktaEmployeeId;
    //     // const url = jobRecord["_links"]["self"]["href"];
    //     // let url = "http://localhost:8080/api/v1/jobregister/"+jobRecord.id
    //     // const url = "http:localhost:8085/jobrecord?id=10"
    //     // because of cors the port number must be repleaced
    //     console.log("cancel url :", url);
    //
    //     return await fetch(url,fetchOption)
    //         .then(async (response)=>{
    //             return response;
    //         })
    // }
    //
    // //TODO in productio use HATEOAS links
    // const updateJobRegistration = async (jobRecordEmployee,data)=>{
    //     const fetchOption = {
    //         "method": "PATCH",
    //         "headers": {
    //             "Content-Type": "application/hal+json",
    //             "Accept": "application/hal+json",
    //             "Authorization": 'Bearer ' + rAuthUserInfo.userAccessToken,
    //         },
    //         "body": JSON.stringify(data)
    //     };
    //     //           http://localhost:8085/api/v1/jobrecords
    //     const url = process.env.REACT_APP_UPDATE_JOB_REGISTRATION+"/" + jobRecordEmployee.id.jobRecordId + "/" + jobRecordEmployee.id.oktaEmployeeId;
    //     // const url = jobRecord["_links"]["self"]["href"];
    //     // let url = "http://localhost:8080/api/v1/jobregister/"+jobRecord.id
    //     // const url = "http:localhost:8085/jobrecord?id=10"
    //     // because of cors the port number must be repleaced
    //     console.log("update url :", url);
    //
    //     return await fetch(url,fetchOption)
    //         .then(async (response)=>{
    //             return response;
    //         })
    // }
    //
    // //TODO in productio use HATEOAS links
    // const updateJobRecordData = async (jobRecord,data)=>{
    //     const fetchOption = {
    //         "method": "PUT",
    //         "headers": {
    //             "Content-Type": "application/hal+json",
    //             "Accept": "application/hal+json",
    //             "Authorization": 'Bearer ' + rAuthUserInfo.userAccessToken,
    //         },
    //         "body": JSON.stringify(data)
    //     };
    //     //           http://localhost:8085/api/v1/jobrecords
    //     // const url = process.env.REACT_APP_UPDATE_JOB_REGISTRATION+"/" + jobRecordEmployee.id.jobRecordId + "/" + jobRecordEmployee.id.oktaEmployeeId;
    //     const url = jobRecord["_links"]["self"]["href"];
    //     // let url = "http://localhost:8080/api/v1/jobregister/"+jobRecord.id
    //     // const url = "http:localhost:8085/jobrecord?id=10"
    //     // because of cors the port number must be repleaced
    //     console.log("update url :", url);
    //
    //     return await fetch(url,fetchOption)
    //         .then(async (response)=>{
    //             return response;
    //         })
    // }
    // const getAllJobRegistration = async ()=>{
    //     const fetchOption = {
    //         "method": "GET",
    //         "headers": {
    //             "Content-Type": "application/json",
    //             "Accept": "application/json",
    //             "Authorization": 'Bearer ' + rAuthUserInfo.userAccessToken,
    //         }
    //     };
    //     const url = process.env.REACT_APP_GET_JOBREGISTRATIONS;
    //     // const url = "http:localhost:8085/jobrecord?id=10"
    //     return await fetch(url,fetchOption)
    //         .then(async (response)=>{
    //             return response;
    //         })
    // }
    //
    // const archiveJobRecord= async (jobRecord)=>{
    //     console.log(jobRecord);
    //     const fetchOption = {
    //         "method": "DELETE",
    //         "headers": {
    //             "Content-Type": "application/json",
    //             "Accept": "application/json",
    //             "Authorization": 'Bearer ' + rAuthUserInfo.userAccessToken,
    //         }
    //     };
    //
    //     const url = jobRecord["_links"]["self"]["href"];
    //
    //     return await fetch(url,fetchOption);
    // }



    return {
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
        saveItem

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
