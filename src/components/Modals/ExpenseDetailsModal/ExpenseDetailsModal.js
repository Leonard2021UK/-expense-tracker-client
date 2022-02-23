import "./expenseDetailsModal.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookOpen, faEdit, faMailBulk, faTrash, faArrowUp,faCheck,faTimes,faWindowClose} from "@fortawesome/free-solid-svg-icons";
import {Col, Container, Modal, Row} from "react-bootstrap";
import ExpensesTable from "../../ExpensesTable/ExpensesTable";
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
                    {/*<div style={{width:"80%",margin:"auto"}}>*/}
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

                    {/*</div>*/}
                </Modal.Body>
                {/*<Modal.Footer>*/}
                {/*    <Button variant="secondary" onClick={handleClose}>*/}
                {/*        Close*/}
                {/*    </Button>*/}
                {/*    <Button variant="primary" disabled={isSubmitting}> Register</Button>*/}
                {/*</Modal.Footer>*/}
            </Modal>
        </>
    )
}

export default ExpenseDetailsModal;