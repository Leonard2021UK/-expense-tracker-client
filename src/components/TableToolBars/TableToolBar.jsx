import React from "react";
import {faPlusSquare,faMinusSquare,faSolarPanel} from "@fortawesome/free-solid-svg-icons";
import "./TableToolBarStyle.css"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// Load LODASH, the full build.
const _ = require('lodash');

const TableToolBar = (props)=>{

    const {add,remove,clear,disable} = props;

        return (
            <>
                {
                    _.isUndefined(add) ? null :
                        <FontAwesomeIcon
                            name="add"
                            onClick={add}
                            icon={faPlusSquare}
                            className={(disable) ? "fas fa-2x fa-disabled" : "fas fa-2x"}
                            color={"green"}
                            style={{margin: 1 + "vh", cursor: "pointer"}}
                        />
                }
                {
                    _.isUndefined(remove) ? null:
                        <FontAwesomeIcon
                        name="add"
                        onClick={remove}
                        icon={faMinusSquare}
                        className={(disable) ? "fas fa-2x fa-disabled" : "fas fa-2x"}
                        color={"red"}
                        style={{margin:1+"vh",cursor:"pointer"}}
                        />
                }
                {
                    _.isUndefined(clear) ? null:
                        <FontAwesomeIcon
                            name="add"
                            onClick={clear}
                            icon={faSolarPanel}
                            className={(disable) ? "fas fa-2x fa-disabled" : "fas fa-2x"}
                            color={"red"}
                            style={{margin:1+"vh",cursor:"pointer"}}
                        />
                }
            </>
        )
    }






export default TableToolBar;