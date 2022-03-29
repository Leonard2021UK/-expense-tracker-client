import React from "react";
import {Col, Container, Modal, Row} from "react-bootstrap";
import exact from "prop-types-exact";
import PropTypes from "prop-types";

import './expensesListModalStyle.css';
import ExpensesTable from "../../ExpensesTable/ExpensesTable";
const ExpenseListModal = (props) =>{

    const {toggleModal,show,currentExpenseTracker,setCurrentExpenseTracker} = props;

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
                    <Modal.Title>Submitted expenses</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <Container fluid style={{padding:1+"vw"}}>
                            <Row>
                                <Col>
                                    <ExpensesTable currentExpenseTracker={currentExpenseTracker} setCurrentExpenseTracker={setCurrentExpenseTracker}/>
                                </Col>
                            </Row>
                        </Container>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ExpenseListModal;

ExpenseListModal.propTypes = exact({
    toggleRegisterModal: PropTypes.func,
    show: PropTypes.bool,
});