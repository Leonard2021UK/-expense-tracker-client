import UserService from "../services/UserService";

const PublicRenderer = ({ children }) => {

    if(!UserService.isLoggedIn()){
        return  children;
    }else{
        return null;
    }
};

export default PublicRenderer