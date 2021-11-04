import UserService from "../services/UserService";

const PublicRenderer = ({ children }) => {
    console.log("public renderer")
    if(!UserService.isLoggedIn()){
        return  children;
    }else{
        return null;
    }
};

export default PublicRenderer