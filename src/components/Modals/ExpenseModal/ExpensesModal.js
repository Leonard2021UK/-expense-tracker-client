import React, {useState} from "react";
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import exact from "prop-types-exact";
import PropTypes from "prop-types";

import './expensesModalStyle.css';
import UserService from "../../../services/UserService";
import ExpensesTable from "../../ExpensesTable/ExpensesTable";
const ExpenseListModal = (props) =>{

    const {toggleModal,show,expenses} = props;

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
                    {/*<div style={{width:"80%",margin:"auto"}}>*/}
                        <Container fluid style={{padding:1+"vw"}}>
                            <Row>
                                <Col>
                                    <ExpensesTable expenses = {expenses}/>
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

export default ExpenseListModal;

ExpenseListModal.propTypes = exact({
    toggleRegisterModal: PropTypes.func,
    show: PropTypes.bool,
});