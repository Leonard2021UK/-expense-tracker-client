import React from "react";
import {Button, Form, Modal} from "react-bootstrap";
import exact from "prop-types-exact";
import PropTypes from "prop-types";
import LoginModal from "../LoginModal/LoginModal";
const RegisterModal = (props) =>{

    const {handleClose,show} = props;

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Sign up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{width:"80%",margin:"auto"}}>
                        <Form>
                            <Form.Group className="mb-3" controlId="formGroupFirstName">
                                <Form.Label>First name</Form.Label>
                                <Form.Control type="text" placeholder="Firstname" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupLastName">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control type="text" placeholder="Last name" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupPasswordConfirm">
                                <Form.Label>Confirm password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm password" />
                            </Form.Group>
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default RegisterModal;

LoginModal.propTypes = exact({
    handleClose: PropTypes.func,
    show: PropTypes.bool,
});