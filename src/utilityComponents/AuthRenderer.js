import UserService from "../services/UserService";

const AuthRenderer = ({ children }) => {
    console.log("authRenderer")
    return (UserService.isLoggedIn()) ? children : null;
}

export default AuthRenderer