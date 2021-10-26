// Load LODASH, the full build.
const _ = require('lodash');
/**
 *
 * @param url - api endpoint
 * @param options - request option (headers,body,method,etc.)
 * @returns {Promise<ValidationOptions.unknown | {errorCauses: [{errorSummary: string}], errorLink: string, errorCode: string, errorId: string, errorSummary: string}>}
 */
export function useFetch(url, options) {

    //Request controller to abort unfinished requests
    let controller = new AbortController();

    //Add the signal object to the Fetch option
    options.signal  = controller.signal;

    /**
     * @function fetchWithTimeout - function handles timeout error
     * @param url {string}
     * @param options {Object}
     * @param timeout {int} - Time to wait until connection is refused (promise rejects)
     * @returns {Promise<unknown>}
     */

    const fetchWithTimeout = (url,options,timeout)=>{
        // Returns the Promise result which finishes first
        return Promise.race([
            fetch(url,options),
            new Promise((_,reject)=>{
                setTimeout(() => reject(new Error('timeout')), timeout)
            })
        ])
    };


    return fetchWithTimeout(url, options, 3000)
        .then(async (response) => {
            return response.json();
        })
        .catch((error) => {
            controller.abort();
            return {
                "errorCode": "C0000001",
                "errorSummary": "Server time out.",
                "errorLink": "C0000001",
                "errorId": "",
                "errorCauses": [
                    {
                        "errorSummary": "Connection: Unable to communicate with the server!"
                    }
                ]
            };
        })
}
