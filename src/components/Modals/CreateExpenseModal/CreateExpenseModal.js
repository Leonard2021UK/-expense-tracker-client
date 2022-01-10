import React from "react";
import {Col, Container, Modal, Row, ToastContainer} from "react-bootstrap";
import ExpenseForm from "../../Forms/ExpenseForm/ExpenseForm";

function CreateExpenseModal(props){


    const{show,toggleModal,currentExpenseTracker,disable} = props;

    return(
        <Modal
            show={show}
            onHide={toggleModal}
            backdrop="static"
            dialogClassName="modal-80w"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Add new expense into the tracker</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/*<div style={{width:"80%",margin:"auto"}}>*/}
                <Container fluid style={{padding:1+"vw"}}>
                    <Row>
                        <Col>
                            <ExpenseForm
                                disable={disable}
                                currentExpenseTracker={currentExpenseTracker}
                                toggleExpenseFormModal={toggleModal}
                            />
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

export default CreateExpenseModal;