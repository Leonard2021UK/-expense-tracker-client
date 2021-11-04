import React,{useState,useEffect} from 'react';
import NavBar from "../../components/Navbar/NavBar";
import SideBar from "../../components/SideBar/SideBar"
// import './lognPage.css';
import '../../components/Navbar/navbar.css'
import {Route, Switch} from "react-router-dom";
import UserService from "../../services/UserService";
import routes from "../../routes";
const Admin = (props) =>{

    const {path,pathHandler} = props;

    useEffect(()=>{
        pathHandler(path)
    },[])

    /**
     * Function creates react routes from the routes file
     **/
    const getRoutes = routes => {
        return routes.map((prop, key) => {
            if (prop.submenu.length !== 0) {
                return getRoutes(prop.submenu);
            }
            //prop.type is defined in the routes file
            if (UserService.hasRealmRole(prop.type)) {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                    />
                );
            } else {
                return null;
            }

        });
    };

    return (
        <>
            <div className="adminNavBarContainer">
                <NavBar />
            </div>
            <div className="sideBarContainer">
                <SideBar props={props}/>
            </div>
            <Switch>{getRoutes(routes)}</Switch>
        </>
    )
}

export default Admin;