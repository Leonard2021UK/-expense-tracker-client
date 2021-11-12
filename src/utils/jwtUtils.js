import {Redirect} from "react-router-dom";

// let inMemoryToken;



const parseJwt = (token) =>{
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

const isTokenExpired = (token) =>{
    const tokenPayload = parseJwt(token);
    console.log("token payload");
    console.log(tokenPayload);

}