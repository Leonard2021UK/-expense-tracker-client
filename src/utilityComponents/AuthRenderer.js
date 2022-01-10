import UserService from "../services/UserService";

const AuthRenderer = ({ children }) => {
    return (UserService.isLoggedIn()) ? children : null;
}

export default AuthRenderer