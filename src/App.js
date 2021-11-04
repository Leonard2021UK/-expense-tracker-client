import IndexPage from "./views/IndexPage/IndexPage";
import {BrowserRouter, Switch} from "react-router-dom";
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
            <Switch>
                <PublicRenderer>
                    <IndexPage path='/' exact={true} />
                </PublicRenderer>
                {/*<AuthRenderer>*/}
                    <Admin path='/admin' pathHandler={customPathHandler}/>
                {/*</AuthRenderer>*/}
            </Switch>
        </>
    );
}

export default App;
