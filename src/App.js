import IndexPage from "./views/IndexPage/IndexPage";
import { Route, Switch} from "react-router-dom";
import Admin from "./layout/admin/Admin";
import {useHistory} from "react-router-dom";
import {SecureRoute} from "./utilityComponents/SecureRoute";

const App = () => {
    let history = useHistory();

    const customPathHandler = (path) => {
        history.push(path);
    };

    return (

        <>
            <Switch>
                <Route path='/' exact={true} render={()=><IndexPage pathHandler={customPathHandler} />}/>
                <SecureRoute path='/admin' component={() =><Admin pathHandler={customPathHandler}/>} />
            </Switch>
        </>
    );
}

export default App;
