import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function RowAction (props){
    const {icon,color,rowId,onClickHandler} = props;
    return(
        <FontAwesomeIcon
            icon={icon}
            className="mr-"
            color={color}
            style={{margin:1+"vh",cursor:"pointer"}}
            onClick={()=>onClickHandler(rowId)}
        />
    )
}

export default RowAction;