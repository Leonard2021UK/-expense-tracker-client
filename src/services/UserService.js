import inMemoryJWT from "../utils/inMemoryJWT";
import {UseCustomFetch} from "../customHooks/useCustomFetch";
// import { useHistory } from 'react-router-dom';
//
// const history = useHistory();



const login = async (values) => {

    const fetchOption = {
        "method": "POST",
        "headers": new Headers({
            'content-type': 'application/json',
            
        }),
        "body": JSON.stringify(values),

    }
    return await UseCustomFetch(process.env.REACT_APP_SIGN_IN,fetchOption)
        .then(async (response)=>{
            inMemoryJWT.setToken(await response['accessToken'])
        })
};





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

const isAuthenticated = () => {


};

const getToken = () => true;

const isLoggedIn = () => {
    return inMemoryJWT.getToken() !== null;
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
