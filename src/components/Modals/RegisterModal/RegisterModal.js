import React, {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import exact from "prop-types-exact";
import PropTypes from "prop-types";
import LoginModal from "../LoginModal/LoginModal";
import {Formik} from "formik";
import * as Yup from 'yup';
import './registerModalStyle.css';
import UserService from "../../../services/UserService";

const RegisterModal = (props) =>{

    const {toggleRegisterModal,show} = props;

    const handleClose = () =>{
        toggleRegisterModal();
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .min(3,"*Username must be at least 3 characters")
            .max(50, "*Username must be less than 100 characters")
            .required("*Username is required"),
        email: Yup.string()
            .email("*Must be a valid email address")
            .max(50, "*Email must be less than 100 characters")
            .required("*Email is required"),
        password: Yup.string()
            .min(6, "*Password must have at least 6 characters")
            .max(40, "*Password can't be longer than 40 characters")
            .oneOf([Yup.ref('confirmPassword'), null], 'Passwords must match')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .min(6, "*Password must have at least 6 characters")
            .max(40, "*Password can't be longer than 40 characters")
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Password confirmation is required'),
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
                    <Modal.Title>Sign up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{width:"80%",margin:"auto"}}>
                        <Formik
                            initialValues={{username:"",email:"",password:"",confirmPassword:""}}
                            validationSchema={validationSchema}
                            onSubmit={(values, {setSubmitting, resetForm}) => {
                                // When button submits form and form is in the process of submitting, submit button is disabled
                                setSubmitting(true);
                                UserService.register(values).then((response)=>{
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
                                    <Form.Group className="mb-3" controlId="formGroupUserName">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="username"
                                            placeholder="Username"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.userName}
                                            className={touched.username && errors.username ? "error" : null}
                                        />
                                        {touched.username && errors.username ? (
                                            <div className="error-message">{errors.username}</div>
                                        ): null}
                                    </Form.Group>
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
                                    <Form.Group className="mb-3" controlId="formGroupPasswordConfirm">
                                        <Form.Label>Confirm password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="Confirm password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.confirmPassword}
                                            className={touched.confirmPassword && errors.confirmPassword ? "error" : null}
                                        />
                                        {touched.confirmPassword && errors.confirmPassword ? (
                                            <div className="error-message">{errors.confirmPassword}</div>
                                        ): null}
                                    </Form.Group>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="primary" type="submit" disabled={isSubmitting}> Register</Button>
                                    </Modal.Footer>
                                </Form>
                            )}
                        </Formik>
                    </div>
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

export default RegisterModal;

LoginModal.propTypes = exact({
    toggleRegisterModal: PropTypes.func,
    show: PropTypes.bool,
});