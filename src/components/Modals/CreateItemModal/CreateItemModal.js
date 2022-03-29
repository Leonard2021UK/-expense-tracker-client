import React from "react";
import {Col, Container, Modal, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import ItemForm from "../../Forms/ItemForm/ItemForm";

function CreateItemModal(props){

    const{show,toggleModal,setNewRowData,rItemTableData} = props;

    const rItemCategories = useSelector((state) => state.suggestions.itemCategory.response);
    const rUnitTypes = useSelector((state) => state.suggestions.unitType.response);
    const rItem = useSelector((state) => state.suggestions.item.response);

    return(
        <Modal
            show={show}
            onHide={toggleModal}
            backdrop="static"
            dialogClassName="modal-50w"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Add new item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container fluid style={{padding:1+"vw"}}>
                    <Row>
                        <Col>
                            <ItemForm
                                rItemTableData={rItemTableData}
                                setNewRowData={setNewRowData}
                                toggleModal={toggleModal}
                                rItemCategories={rItemCategories}
                                rUnitTypes={rUnitTypes}
                                rItem={rItem}
                            />

                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    )
}

export default CreateItemModal;