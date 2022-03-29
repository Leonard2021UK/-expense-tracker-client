import React from "react";
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

