import React,{useState,useEffect} from 'react';
import NavBar from "../../components/Navbar/NavBar";
import SideBar from "../../components/SideBar/SideBar"
// import './lognPage.css';
import '../../components/Navbar/navbar.css'
import {Route, Switch} from "react-router-dom";
import UserService from "../../services/UserService";
import routes from "../../routes";
import {Col, Container, Row} from "react-bootstrap";
import DashboardGridCards from "../../components/DashboardGridCards/DashboardGridCards";
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
    // <Col lg={4} md={3} xs={1}>
    //     <SideBar props={props}/>
    // </Col>
    // <Col >
    //     <NavBar />
    // </Col>
    return (
        <>
            <Container fluid style={{padding:0}}>
                <Row style={{margin:0}}>
                    <Col xs={2} md={2} lg={2} style={{padding:0}}>
                        <Col style={{height:100+"vh",padding:0}}>
                            <SideBar/>
                        </Col>

                    </Col>
                    <Col xs={10} md={10} lg={10} style={{padding:0}}>
                        <Row style={{margin:0}}>
                            <NavBar />
                        </Row>
                        <Row style={{margin:0}}>
                            <Col xs={12} md={12} lg={12} style={{paddingLeft:2+"em",paddingRight:2+"em"}}>
                                <Switch>{getRoutes(routes)}</Switch>
                            </Col>

                        </Row>

                    </Col>

                </Row>

            </Container>

        </>
    )
}

export default Admin;