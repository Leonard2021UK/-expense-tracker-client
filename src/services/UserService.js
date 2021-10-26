
import {useFetch} from "../customHooks/useFetch";

const login = () => {

};

const logout = () => true;

const register = () => {

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
