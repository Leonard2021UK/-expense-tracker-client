// Load the core build.
const _ = require('lodash/core');
const inMemoryJWT = () => {

    let inMemoryJWT = null;

    let header = null;
    let payload = null;

    const getToken = () => inMemoryJWT;

    const setToken = (token) => {
        inMemoryJWT = token;
        if(!_.isNull(token)){
            let tokens = token.split(".");
            header = atob(tokens[0]);
            payload = atob(tokens[1]);
        }

        return true;
    };

    const getHeader = () => header;
    const getPayload = () => payload;


    const deleteToken = () => {
        inMemoryJWT = null;
        return true;
    }

    return {
        deleteToken: deleteToken,
        getToken,
        setToken,
        getHeader,
        getPayload
    }
};

export default inMemoryJWT();