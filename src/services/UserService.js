
import {UseCustomFetch} from "../customHooks/useCustomFetch";

const login = async (values) => {
    const fetchOption = {
        "method": "POST",
        "headers": new Headers({'content-type': 'application/json'}),
        "body": JSON.stringify(values),

    }
    return await UseCustomFetch(process.env.REACT_APP_SIGN_IN,fetchOption)
        .then(async (response)=>{
            return response;
        })
};

const logout = () => true;

const register = async (values) => {
    const fetchOption = {
        "method": "POST",
        "headers": new Headers({'content-type': 'application/json'}),
        "body": JSON.stringify(values),

    }
    return await UseCustomFetch(process.env.REACT_APP_SIGNUP,fetchOption)
        .then(async (response)=>{
            return response;
        })
};

const isAuthenticated = () => true;

const getToken = () => true;

const isLoggedIn = () => false;

const getUsername = () => "Anonymus";

const hasRealmRole = () => "USER";

const hasResourceRole = () => "USER";

const isAuthorized = () => true

const UserService = {
    login,
    logout,
    isAuthenticated,
    getToken,
    hasRealmRole,
    hasResourceRole,
    getUsername,
    isLoggedIn,
    register,
    isAuthorized
}

export default UserService;
