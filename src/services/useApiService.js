// Load LODASH, the full build.
// const _ = require('lodash');
import inMemoryJWT from "../utils/inMemoryJWT";
import {useSelector} from "react-redux";
import {UseCustomFetch} from "../customHooks/useCustomFetch";


export function useApiService() {


    const getAllExpenseTrackers = async ()=>{
        const fetchOption = {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": 'Bearer ' + inMemoryJWT.getToken(),
            }
        };
        const url = process.env.REACT_APP_EXPENSES_TRACKER;
        return await UseCustomFetch(url,fetchOption)
            .then( (response)=>{
                return response;
            })
    }

    // const getMyBookings = async ()=>{
    //     const fetchOption = {
    //         "method": "GET",
    //         "headers": {
    //             "Content-Type": "application/json",
    //             "Accept": "application/json",
    //             "Authorization": 'Bearer ' + rAuthUserInfo.userAccessToken,
    //         }
    //     };
    //     const url = process.env.REACT_APP_GET_ALL_JOBREGISTRATIONS_FOR_USER;
    //     // const url = "http:localhost:8085/jobrecord?id=10"
    //     return await fetch(url,fetchOption)
    //         .then(async (response)=>{
    //             return response;
    //         })
    // }

    // Response {type: "cors", url: "http://localhost:8080/api/v1/jobrecord", redirected: false, status: 401, ok: false, …}
    // body: ReadableStream
    // bodyUsed: true
    // headers: Headers {}
    // ok: false
    // redirected: false
    // status: 401
    // statusText: "Unauthorized"
    // type: "cors"
    // url: "http://localhost:8080/api/v1/jobrecord"
    // __proto__: Response

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
        getAllExpenseTrackers
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
