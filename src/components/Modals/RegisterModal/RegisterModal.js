import React, {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import exact from "prop-types-exact";
import PropTypes from "prop-types";
import LoginModal from "../LoginModal/LoginModal";
import { useDispatch } from 'react-redux'
import {setRegisterFormState,clearRegisterForm} from "../../../redux/features/authentication/registerFormSlice";

const RegisterModal = (props) =>{

    const {toggleRegisterModal,show} = props;

    const dispatch = useDispatch()

    const [formState,setFormState] = useState({});

    const handleClose = () =>{
        dispatch(clearRegisterForm());
        toggleRegisterModal();
    }

    const handleOnBlur = () =>{
        dispatch(setRegisterFormState({formState:formState}));
   }

    const handleFormChange = (event)=>{
        let name = event.target.name;
        let value = event.target.value;

        setFormState(prevState => ({...prevState, [name]: value}));
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
                    <Modal.Title>Sign up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{width:"80%",margin:"auto"}}>

                        <Form>
                            <Form.Group className="mb-3" controlId="formGroupFirstName">
                                <Form.Label>First name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="firstName"
                                    placeholder="Firstname"
                                    onChange={handleFormChange}
                                    onBlur={handleOnBlur}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupLastName">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lastName"
                                    placeholder="Last name"
                                    onChange={handleFormChange}
                                    onBlur={handleOnBlur}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    onChange={handleFormChange}
                                    onBlur={handleOnBlur}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={handleFormChange}
                                    onBlur={handleOnBlur}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupPasswordConfirm">
                                <Form.Label>Confirm password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm password"
                                    onChange={handleFormChange}
                                    onBlur={handleOnBlur}
                                />
                            </Form.Group>
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Register</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default RegisterModal;

LoginModal.propTypes = exact({
    toggleRegisterModal: PropTypes.func,
    show: PropTypes.bool,
});