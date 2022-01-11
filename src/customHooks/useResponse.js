// Load LODASH, the full build.
import notification from "../components/Notification/Notification";

const _ = require('lodash');

/**
 *
 * @param setState
 * @param reset
 * @returns {((function(*=, *=, *=): boolean)|*)[]}
 */
export function useResponse(setState,reset) {

    /**
     *
     * @param response - data received from the server
     * @param customSuccessMessage
     * @param customErrorMessage
     * @returns {boolean}
     */
    const handleResponse = async (response,customSuccessMessage = null, customErrorMessage = null )=>{
        console.log("RESPONSE IN USE RESPONSE ", response)
        if (!response.ok ) {

            if (_.isUndefined(response.errorCauses)){
                notification(response.json(),"error");

            }else if(response && response.errorCauses.length > 0){
                response.errorCauses.forEach((error)=>{
                        // TODO error handling when server timed out, use debug mode
                    // notification(response.json().message,"error");
                    notification(error,"error");
                })
            }else{
            //     // use custom error message
            //     if (customErrorMessage){
            //         notification(customErrorMessage,"error");
            //     }else{
            //
            //         if(!_.isNull(response)){
            //             notification("System error:" + response.errorSummary,"error");
            //         }else{
            //             notification("System error:","error");
            //
            //         }
            //
                }

            }
            // error
            // return false;
            //handles errors which are occuring before the request reaches the server
        // }
        // else if(response && !_.isUndefined(response.ok) ){
        //   if (!response.ok) {
        //       notification(response.statusText, "error");
        //   }else {
        //       if(setState){
        //           setState(response)
        //           notification(customSuccessMessage,"success");
        //       }
        //
        //   }
        // }
        else{
            if (customSuccessMessage){
                notification(customSuccessMessage,"success");

            }
            if(setState){
                let r = await response.json()
                setState(r)
            }
            //resets form
            if(reset){
                // reset()
            }
            // success
            // return true;
        }
    }

    return [handleResponse]
}
