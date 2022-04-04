// Load LODASH, the full build.
import UserService from "../services/UserService";
import inMemoryJWT from "../utils/inMemoryJWT";

const _ = require('lodash');
/**
 *
 * @param url - api endpoint
 * @param options - request option (headers,body,method,etc.)
 * @returns {Promise<ValidationOptions.unknown | {errorCauses: [{errorSummary: string}], errorLink: string, errorCode: string, errorId: string, errorSummary: string}>}
 */
export function UseCustomFetch(url, options) {

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

            //Handle unauthorized request, resend refresh token
            if(response.status === 401){

               return await UserService.refreshToken()
                    .then(async (response) => {

                        if (response.status === 401 || response.status === 403) {
                            //when refresh token is invalid as well logout the user and redirect
                            UserService.logout();

                        } else if (response['status'] === 200) {
                            const parsedResponse = await response.json();

                            if (parsedResponse['accessToken']) {
                                const jwt = parsedResponse['accessToken'];
                                inMemoryJWT.setToken(jwt);
                                return jwt;
                            }
                        }
                    })
                   .then((response)=>{
                        // when JWT is obtained then repeat the call with the updated JWT
                       if(!_.isUndefined(response)){
                           options.headers["Authorization"] = 'Bearer ' + inMemoryJWT.getToken();
                           return fetchWithTimeout(url, options, 3000);
                       }
                    })
            }else{
                return response;
            }
        })
        .catch((error) => {
            controller.abort();
            return {
                "errorCode": "C0000001",
                "errorSummary": "Server time out.",
                "error": error,
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
