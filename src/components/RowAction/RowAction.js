import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookOpen} from "@fortawesome/free-solid-svg-icons";

function RowAction (props){
    const {icon,color} = props;
    return(
        <FontAwesomeIcon icon={icon} className="mr-" color={color} style={{margin:1+"vh",cursor:"pointer"}} />
    )
}

export default RowAction;