import inMemoryJWT from "../../utils/inMemoryJWT.js";
import {UseCustomFetch} from "../../customHooks/useCustomFetch.js";
export default function useGeneralDataModule() {

    const deleteData = async (data, url) => {
        const fetchOption = {
            "method": "DELETE",
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": 'Bearer ' + inMemoryJWT.getToken(),
            }
        };

        const fetchUrl = url + "/" + data.id;
        return await UseCustomFetch(fetchUrl, fetchOption)
            .then((response) => {

                return response;
            })
    }

    const getInitData = async () => {
        const fetchOption = {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": 'Bearer ' + inMemoryJWT.getToken(),
            }
        };

        const url = process.env.REACT_APP_INIT_DATA;
        return await UseCustomFetch(url, fetchOption)
            .then((response) => {
                return response;
            })
    }

    return{
        getInitData,
        deleteData
    }
}