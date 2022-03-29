import { Card, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTrash} from "@fortawesome/free-solid-svg-icons";
import React from "react";


const CustomTabContent = (props)=>{

    const {dataCollection,url,toDispatch,handleDeleteData,options} = props;

    return(
        <>

            <Card>
                <Card.Header>{options.cardHeader}</Card.Header>
                <Card.Body>
                    <Card.Title>{options.cardTitle}</Card.Title>
                    <Card.Text>
                        {options.cardText}
                    </Card.Text>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Updated at</th>
                            <th>Created at</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {dataCollection.map((data,index)=>{
                            return(
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{data.name}</td>
                                    <td>{data.updatedAt}</td>
                                    <td>{data.createdAt}</td>
                                    <td>
                                        <FontAwesomeIcon icon={faTrash} className="mr-2" color={"red"}
                                                         style={{margin: 1 + "vh", cursor: "pointer"}}
                                                         onClick={() => handleDeleteData(data,url,toDispatch,options)}/>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

        </>
    )
}

export default CustomTabContent;