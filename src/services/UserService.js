
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

let inMemoryToken;

function loginHandle ({ jwt_token, jwt_token_expiry }, noRedirect) {
    inMemoryToken = {
        token: jwt_token,
        expiry: jwt_token_expiry
    };
    if (!noRedirect) {
        Router.push('/app')
    }
}



const logout = () => true;

const register = async (values) => {
    const fetchOption = {
        "method": "POST",
        "headers": new Headers({'content-type': 'application/json'}),
        "body": JSON.stringify(values),

    }
    console.log(process.env.REACT_APP_SIGNUP)
    return await UseCustomFetch(process.env.REACT_APP_SIGNUP,fetchOption)
        .then(async (response)=>{
            return response;
        })
};

const isAuthenticated = () => true;

const getToken = () => true;

const parseJwt = (token) =>{
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

const isLoggedIn = () => {
    const jwt_token = inMemoryToken;
    if (!jwt_token) {
        Router.push('/login')
    }
    return jwt_token
};

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
