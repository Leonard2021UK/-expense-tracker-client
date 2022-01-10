import React from "react";
import {Col, Container, Modal, Row, ToastContainer} from "react-bootstrap";
import ExpensesTable from "../../ExpensesTable/ExpensesTable";
import ExpenseTrackerForm from "../../Forms/ExpenseTrackerForm/ExpenseTrackerForm";
import {useDispatch, useSelector} from "react-redux";
import ItemForm from "../../Forms/ItemForm/ItemForm";

function CreateItemModal(props){

    const{show,toggleModal,setNewRowData,rTableData} = props;


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
                {/*<div style={{width:"80%",margin:"auto"}}>*/}
                <Container fluid style={{padding:1+"vw"}}>
                    <Row>
                        <Col>
                            <ItemForm rTableData={rTableData} setNewRowData={setNewRowData} toggleModal={toggleModal}/>

                        </Col>
                    </Row>
                </Container>

                {/*</div>*/}
            </Modal.Body>
            {/*<Modal.Footer>*/}
            {/*    <Button variant="secondary" onClick={handleClose}>*/}
            {/*        Close*/}
            {/*    </Button>*/}
            {/*    <Button variant="primary" disabled={isSubmitting}> Register</Button>*/}
            {/*</Modal.Footer>*/}
        </Modal>
    )
}

export default CreateItemModal;