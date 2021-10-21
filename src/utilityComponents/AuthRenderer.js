import UserService from "../services/UserService";

const AuthRenderer = ({ children }) => (UserService.isLoggedIn()) ? children : null;

export default AuthRenderer