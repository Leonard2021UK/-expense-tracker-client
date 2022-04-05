import inMemoryJWT from "../utils/inMemoryJWT";
import {UseCustomFetch} from "../customHooks/useCustomFetch";
import store from "../redux/store";
import storage from 'redux-persist/lib/storage';
// import { useHistory } from 'react-router-dom';
//
// const history = useHistory();
// Load the core build.
const _ = require('lodash/core');

const login = async (values) => {

    const fetchOption = {
        "method": "POST",
        'credentials': 'include',
        "headers": new Headers({
            'content-type': 'application/json',
        }),
        "body": JSON.stringify(values),

    }
    return await UseCustomFetch(process.env.REACT_APP_SIGN_IN,fetchOption)
        .then( async (response)=>{
            if(response['status'] === 200){
                const parsedResponse = await response.json();
                if(parsedResponse['accessToken']){
                    const jwt = parsedResponse['accessToken'];
                    inMemoryJWT.setToken(jwt)
                }

            }
            return inMemoryJWT
        })
};

const syncLogout = (event) => {
    if (event.key === 'logout') {
        window.location.replace("/");
    }
}

const logout = () => {
    inMemoryJWT.setToken(null);
    store.dispatch({ type: 'LOGOUT' })
    storage.removeItem('persist:root')
    window.localStorage.setItem('logout', Date.now())
};

const register = async (values) => {
    const fetchOption = {
        "method": "POST",
        "headers": new Headers({'content-type': 'application/json'}),
        "body": JSON.stringify(values),

    }
    return await UseCustomFetch( process.env.REACT_APP_SIGNUP,fetchOption)
        .then(async (response)=>{
            return response;
        })
};

const isAuthenticated = () => {
    return inMemoryJWT.getToken() !== null;

};

const refreshToken = async () => {
    const fetchOption = {
        "method": "POST",
        'credentials': 'include',
        "headers": new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }),
    }

    return await UseCustomFetch(process.env.REACT_APP_REFRESH_TOKEN,fetchOption)
        .then(async (response)=>{
            return response;
        })
}

const getToken = () => inMemoryJWT.getToken();

const isLoggedIn = () => {
    return inMemoryJWT.getToken() !== null;
};

const getUsername = () => JSON.parse(inMemoryJWT.getPayload())['sub'];

const hasRealmRole = (requiredRoles) => {
    const roles = JSON.parse(inMemoryJWT.getPayload())['role'];

    return requiredRoles.some((reqRole) => {
        return roles.some((auth) => auth.authority === reqRole);
    })

};

// const hasResourceRole = () => "USER";

// const isAuthorized = () => true

window.addEventListener('storage', syncLogout)

const UserService = {
    login,
    logout,
    isAuthenticated,
    getToken,
    hasRealmRole,
    // hasResourceRole,
    getUsername,
    isLoggedIn,
    register,
    // isAuthorized,
    refreshToken
}

export default UserService;
