import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import React, {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import _ from "lodash";
import {clearRegisterForm} from "../../../redux/features/authentication/registerFormSlice";
import { useDispatch } from 'react-redux'
import {Formik} from "formik";

const LoginModal = (props) =>{

    const {toggleLoginModal,show,toggleRegisterModal} = props;

    const [formState,setFormState] = useState({});

    const dispatch = useDispatch()

    const handleFormChange = (event)=>{
        let name = event.target.name;
        let value = event.target.value;

        setFormState(prevState => ({...prevState, [name]: value}));
    }

    const handleRegister = () =>{
        toggleLoginModal();
        toggleRegisterModal();
    }

    const handleClose = () =>{
        dispatch(clearRegisterForm());
        toggleLoginModal();
    }

    const handleLogin = () =>{

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
                        <Formik initialValues={{ name:"", email:"", phone:"", blog:""}} >
                            <Form>
                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        onChange={handleFormChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        onChange={handleFormChange}
                                    />
                                </Form.Group>
                                <span style={{marginLeft:"75%"}} onClick={handleRegister}>Or register</span>
                            </Form>
                        </Formik>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleLogin}>Login</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default LoginModal;

LoginModal.propTypes = exact({
    toggleLoginModal: PropTypes.func,
    show: PropTypes.bool,
    toggleRegisterModal: PropTypes.func
});