import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import React, {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {Formik} from "formik";
import * as Yup from 'yup';
import './loginModalStyle.css';
import UserService from "../../../services/UserService";
import {useHistory} from "react-router-dom";
import CustomSpinner from "../../Spinner/CustomSpinner";
const _ = require('lodash/core');

const LoginModal = (props) =>{

    let history = useHistory();

    const {toggleLoginModal,show,toggleRegisterModal} = props;
    const [showSpinner,setShowSpinner] = useState(false);
    const [showLoginError,setShowLoginError] = useState(false);
    const handleClose = () =>{
        setShowLoginError(false);
        toggleLoginModal();
    }


    const handleRegister = () =>{
        toggleLoginModal();
        toggleRegisterModal();
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
                    {showLoginError ? (
                        <div className="login-error-message-container">
                            <div className="login-error-message">{"Incorrect username or password!"}</div>
                        </div>
                    ): null}
                    <div style={{width:"80%",margin:"auto"}}>
                        <Formik
                            initialValues={{email:"",password:""}}
                            validationSchema={validationSchema}
                            onSubmit={(values, {setSubmitting, resetForm}) => {
                                // When button submits form and form is in the process of submitting, submit button is disabled
                                setSubmitting(true);
                                setShowSpinner(true)
                                UserService.login(values).then((response)=>{

                                    setShowSpinner(false);
                                    if(_.isNull(response.getToken())){
                                        setShowLoginError(true);
                                    }else{
                                        //redirects to admin page
                                        history.push("/admin/dashboard");
                                    }
                                });

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
                <Modal.Footer>
                    <CustomSpinner hidden={showSpinner}/>
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