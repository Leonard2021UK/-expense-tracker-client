import React, {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import exact from "prop-types-exact";
import PropTypes from "prop-types";
import LoginModal from "../LoginModal/LoginModal";
import { useDispatch } from 'react-redux'
import {setRegisterFormState,clearRegisterForm} from "../../../redux/features/authentication/registerFormSlice";
import {Formik} from "formik";
import * as Yup from 'yup';
import './registerModalStyle.css';

const RegisterModal = (props) =>{

    const {toggleRegisterModal,show} = props;

    const dispatch = useDispatch()

    const [formState,setFormState] = useState({});

    const handleClose = () =>{
        dispatch(clearRegisterForm());
        toggleRegisterModal();
    }

   //  const handleOnBlur = () =>{
   //      dispatch(setRegisterFormState({formState:formState}));
   // }
   //
   //  const handleFormChange = (event)=>{
   //      let name = event.target.name;
   //      let value = event.target.value;
   //
   //      setFormState(prevState => ({...prevState, [name]: value}));
   //  }

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, "*First name must have at least 2 characters")
            .max(100, "*First name can't be longer than 100 characters")
            .required("*First nam is required"),
        lastName: Yup.string()
            .min(2, "*Last name must have at least 2 characters")
            .max(100, "*Last name can't be longer than 100 characters")
            .required("*Last name is required"),
        email: Yup.string()
            .email("*Must be a valid email address")
            .max(100, "*Email must be less than 100 characters")
            .required("*Email is required"),
        password: Yup.string()
            .oneOf([Yup.ref('confirmPassword'), null], 'Passwords must match')
            .required('Password is required'),
        confirmPassword: Yup.string()
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
                            initialValues={{firstName: "",lastName:"",email:"",password:"",confirmPassword:""}}
                            validationSchema={validationSchema}
                            onSubmit={(values, {setSubmitting, resetForm}) => {
                                // When button submits form and form is in the process of submitting, submit button is disabled
                                setSubmitting(true);

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
                                    <Form.Group className="mb-3" controlId="formGroupFirstName">
                                        <Form.Label>First name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="firstName"
                                            placeholder="Firstname"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.firstName}
                                            className={touched.firstName && errors.firstName ? "error" : null}
                                        />
                                        {touched.firstName && errors.firstName ? (
                                            <div className="error-message">{errors.firstName}</div>
                                        ): null}
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formGroupLastName">
                                        <Form.Label>Last name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="lastName"
                                            placeholder="Last name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.lastName}
                                            className={touched.lastName && errors.lastName ? "error" : null}
                                        />
                                        {touched.lastName && errors.lastName ? (
                                            <div className="error-message">{errors.lastName}</div>
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