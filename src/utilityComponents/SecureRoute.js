import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import UserService from "../services/UserService";

export function SecureRoute({ component: Component, roles, ...rest }) {

    return (
        <Route {...rest} render={props => { return UserService.isAuthenticated() && UserService.isAuthorized(roles)
                    ? <Component {...props} />
                    : <Redirect to={{ pathname: '/', }} />
            }}
        />
    )
}