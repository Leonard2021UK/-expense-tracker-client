import React from "react";
import {Col, Container, Modal, Row} from "react-bootstrap";
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
            </Modal.Body>

        </Modal>
    )
}

export default CreateExpenseModal;