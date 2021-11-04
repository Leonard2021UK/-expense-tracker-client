import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import UserService from "../services/UserService";

export function SecureRoute({ component: Component, pathHandler,roles, ...rest }) {

    return (
        <Route {...rest} render={props => {
            console.log(props)
            return UserService.isLoggedIn()
                    ? <Component {...props} />
                    : <Redirect to={{ pathname: '/', }} />
            }}
        />
    )
}