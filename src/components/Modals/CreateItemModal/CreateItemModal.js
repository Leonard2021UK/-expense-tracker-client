import React from "react";
import {Col, Container, Modal, Row, ToastContainer} from "react-bootstrap";
import ExpensesTable from "../../ExpensesTable/ExpensesTable";
import ExpenseTrackerForm from "../../Forms/ExpenseTrackerForm/ExpenseTrackerForm";
import {useDispatch, useSelector} from "react-redux";

function CreateItemModal(props){

    const{show,toggleModal} = props;


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
                            <h1>hhhhh</h1>

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