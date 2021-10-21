import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import React from "react";
import {Button, Form, Modal} from "react-bootstrap";
const LoginModal = (props) =>{

    const {handleClose,show,handleShowRegister} = props;

    const handleRegister = () =>{
        handleClose();
        handleShowRegister();
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{width:"80%",margin:"auto"}}>
                        <Form>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <span style={{marginLeft:"75%"}} onClick={handleRegister}>Or register</span>
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

export default LoginModal;

LoginModal.propTypes = exact({
    handleClose: PropTypes.func,
    show: PropTypes.bool,
    handleShowRegister: PropTypes.func
});