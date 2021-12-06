import React, {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import exact from "prop-types-exact";
import PropTypes from "prop-types";
import LoginModal from "../Modals/LoginModal/LoginModal";
import {Formik} from "formik";
import * as Yup from 'yup';
import './registerModalStyle.css';
import UserService from "../../services/UserService";

const ExpenseForm = (props) =>{

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(3,"*name must be at least 3 characters")
            .max(50, "*Name must be less than 100 characters")
            .required("*Name is required")
    });

    return (
        <>
            <div style={{width:"80%",margin:"auto"}}>
            <Formik
                initialValues={{name:""}}
                validationSchema={validationSchema}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                    // When button submits form and form is in the process of submitting, submit button is disabled
                    setSubmitting(true);
                    console.log(values)
                    UserService.register(values).then((response)=>{
                        console.log(response)
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
                        <Form.Group className="mb-3" controlId="formGroupName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                className={touched.name && errors.name ? "error" : null}
                            />
                            {touched.name && errors.name ? (
                                <div className="error-message">{errors.name}</div>
                            ): null}
                        </Form.Group>
                        <Form.Group>
                            <Button variant="secondary" >
                                Close
                            </Button>
                            <Button variant="primary" type="submit" disabled={isSubmitting}> Register</Button>
                        </Form.Group>
                    </Form>
                )}
            </Formik>
            </div>
        </>
    )
}

export default ExpenseForm;

LoginModal.propTypes = exact({
    toggleRegisterModal: PropTypes.func,
    show: PropTypes.bool,
});