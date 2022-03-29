import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookOpen, faTrash} from "@fortawesome/free-solid-svg-icons";
import React,  from "react";
import { FormControl, InputGroup} from "react-bootstrap";
import AutoSuggestion from "../../AutoSuggestion/AutoSuggestion";

const ItemTableRow = ()=>{

    return (
        <>
            <th scope="row">{1}</th>
            <td >
               <AutoSuggestion/>
            </td>
            <td>
                <InputGroup className="mb-1">
                    <FormControl/>
                </InputGroup>
            </td>
            <td>
                <InputGroup className="mb-1">
                    <FormControl/>
                </InputGroup>
            </td>
            <td>
                <InputGroup className="mb-1">
                    <FormControl/>
                </InputGroup>
            </td>
            <td>
                <InputGroup className="mb-1">
                    <FormControl/>
                </InputGroup>
            </td>
            <td>
                <InputGroup className="mb-1">
                    <FormControl/>
                </InputGroup>
            </td>
            <td>
                <FontAwesomeIcon icon={faBookOpen} className="mr-" color={"green"} style={{margin:1+"vh",cursor:"pointer"}} />
                <FontAwesomeIcon icon={faTrash} className="mr-2" color={"red"} style={{margin:1+"vh",cursor:"pointer"}} />
            </td>

        </>
    )
}

export default ItemTableRow;