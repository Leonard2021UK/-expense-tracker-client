import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import React, {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {clearRegisterForm} from "../../../redux/features/authentication/registerFormSlice";
import { useDispatch } from 'react-redux'
import {Formik} from "formik";
import * as Yup from 'yup';
import './loginModalStyle.css';
import UserService from "../../../services/UserService";

const LoginModal = (props) =>{

    const {toggleLoginModal,show,toggleRegisterModal} = props;

    const handleClose = () =>{
        toggleLoginModal();
    }


    const handleRegister = () =>{
        toggleLoginModal();
        toggleRegisterModal();
    }



    const handleLogin = () =>{

    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("*Must be a valid email address")
            .max(40, "*Email must be less than 100 characters")
            .required("*Email is required"),
        password: Yup.string()
            .required('Password is required'),

    });

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
                        <Formik
                            initialValues={{email:"",password:""}}
                            validationSchema={validationSchema}
                            onSubmit={(values, {setSubmitting, resetForm}) => {
                                // When button submits form and form is in the process of submitting, submit button is disabled
                                setSubmitting(true);
                                console.log(values)
                                UserService.login(values).then((response)=>{
                                    // window.location.replace("http://localhost:3000/admin")
                                    toggleLoginModal();
                                })

                                // Resets form after submission is complete
                                resetForm();

                                // Sets setSubmitting to false after form is reset
                                setSubmitting(false);

                            }}
                        >
                            {(
                                {
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    isSubmitting
                                }
                            )=>(
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="Enter email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        className={touched.email && errors.email ? "error" : null}
                                    />
                                    {touched.email && errors.email ? (
                                        <div className="error-message">{errors.email}</div>
                                    ): null}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        className={touched.password && errors.password ? "error" : null}
                                    />
                                    {touched.password && errors.password ? (
                                        <div className="error-message">{errors.password}</div>
                                    ): null}
                                </Form.Group>
                                <span style={{marginLeft:"75%"}} onClick={handleRegister}>Or register</span>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" type="submit" disabled={isSubmitting}>Login</Button>
                                </Modal.Footer>
                            </Form>
                            )}
                        </Formik>
                    </div>
                </Modal.Body>

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