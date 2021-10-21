import IndexPage from "./views/IndexPage/IndexPage";
import {BrowserRouter} from "react-router-dom";
import Admin from "./layout/admin/Admin";
import PublicRenderer from "./utilityComponents/PublicRenderer";
import AuthRenderer from "./utilityComponents/AuthRenderer";
import {useHistory} from "react-router-dom";

const App = () => {
    let history = useHistory();

    const customPathHandler = (path) => {
        history.push(path);
    };

    return (

        <>
            <PublicRenderer>
                <IndexPage path={"/"} pathHandler={customPathHandler}/>
            </PublicRenderer>
            <AuthRenderer>
                <Admin path={"/admin"} pathHandler={customPathHandler}/>
            </AuthRenderer>
        </>
    );
}

export default App;
