import React from "react";
import {Button} from "react-bootstrap";

const ItemsTableHeader = (props)=>{
    return (
            <Button
                color="link"
                className="animation-on-hover"
                id={props.id}
                name={props.name}
                type="button"
                disabled={false}
            >
                <div>{props.title}</div>
            </Button>
    )
};

export default ItemsTableHeader;

