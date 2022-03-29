import "./expenseDetailsModal.css";
import {Col, Container, Modal, Row} from "react-bootstrap";
import React from "react";
import ExpenseForm from "../../Forms/ExpenseForm/ExpenseForm";

const ExpenseDetailsModal = (props)=>{
    const {toggleModal,show,initialValue,disable,title,ownerExpenseTracker,update,setSelectedExpense} = props;
    const handleClose = () =>{
        toggleModal();
    }
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                dialogClassName="modal-80w"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid style={{padding:1+"vw"}}>
                        <Row>
                            <Col>
                                <ExpenseForm
                                    initialValue={initialValue}
                                    setSelectedExpense={setSelectedExpense}
                                    disable={disable}
                                    toggleModal={toggleModal}
                                    ownerExpenseTracker={ownerExpenseTracker}
                                    update={update}
                                />
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ExpenseDetailsModal;