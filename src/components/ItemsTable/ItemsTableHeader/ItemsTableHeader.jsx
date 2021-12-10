import React from "react";
import {Button} from "react-bootstrap";
// import "../ItemsTableStyle.css"
const ItemsTableHeader = (props)=>{
    return (
            <th
                color="link"
                className="animation-on-hover "
                id={props.id}
                name={props.name}
                type="button"
                disabled={false}
            >
                <div>{props.title}</div>
            </th>
    )
};

export default ItemsTableHeader;

