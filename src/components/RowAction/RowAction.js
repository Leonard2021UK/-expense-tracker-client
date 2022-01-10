import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./rowActionStyle.css";

function RowAction (props){
    const {icon,color,rowId,onClickHandler,disable} = props;
    return(
        <FontAwesomeIcon
            disabled={disable}
            icon={icon}
            className={(disable) ? "fa-disabled" : ""}
            color={color}
            style={{margin:1+"vh",cursor:"pointer"}}
            onClick={()=>onClickHandler(rowId)}
        />
    )
}

export default RowAction;