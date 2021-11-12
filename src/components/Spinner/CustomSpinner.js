import {Spinner} from "react-bootstrap";
import React from "react";

const CustomSpinner = (props) =>{
    const {hidden} = props;

    if(!hidden){
        return null;
    }else{
       return <Spinner animation="border" variant="primary" />
    }
}

export default CustomSpinner;