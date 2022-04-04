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
        //TODO refactor response handler

       try {
           if (!response.ok ) {

               if (_.isUndefined(response.errorCauses)){

                   let parsedResponse = await response.json();
                   notification(parsedResponse.message,"error");

               }else if(response && response.errorCauses.length > 0){
                   response.errorCauses.forEach((error)=>{
                       // TODO error handling when server timed out, use debug mode
                       notification(error,"error");
                   })
               }else{
                    notification(customErrorMessage,"error");
               }

           }
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
       }catch (error){
           notification("Something went wrong!","error");
           console.error(error)
       }
    }

    return [handleResponse]
}
