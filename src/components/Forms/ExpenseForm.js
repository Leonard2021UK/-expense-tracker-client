import React, {useState} from "react";
import {Button, Col, FloatingLabel, Form, Modal, Row} from "react-bootstrap";
import exact from "prop-types-exact";
import PropTypes from "prop-types";
import LoginModal from "../Modals/LoginModal/LoginModal";
import {Formik} from "formik";
import * as Yup from 'yup';
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
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGroupName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="Enter namename"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    className={touched.name && errors.name ? "error" : null}
                                />
                                {touched.name && errors.name ? (
                                    <div className="error-message">{errors.name}</div>
                                ): null}
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridPhone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type="phone"
                                    name="phone"
                                    placeholder="Enter phone number"
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridMobile">
                                <Form.Label>Mobile</Form.Label>
                                <Form.Control
                                    type="mobile"
                                    name="mobile"
                                    placeholder="Enter mobile number"
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Col>
                                <FloatingLabel controlId="floatingSelect" label="Address">
                                    <Form.Select aria-label="Floating label select example">
                                        <option>Select address</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel controlId="floatingSelect" label="Payment type">
                                    <Form.Select aria-label="Floating label select example">
                                        <option>Select payment type</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row style={{marginTop:5 + "vh"}}>
                             <Col>
                                <FloatingLabel controlId="floatingSelect" label="Expense type">
                                    <Form.Select aria-label="Floating label select example">
                                        <option>Select expense type</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                        </Row>

                        <Row style={{marginTop:5 + "vh",marginBottom:5 + "vh"}}>
                            <Col>
                                <FloatingLabel controlId="floatingTextarea" label="Comments">
                                    <Form.Control as={Col} placeholder="Leave a comment here" />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row>

                        </Row>
                        <Row>
                            <Form.Group>
                                <Row>
                                    <Col md={1}>
                                        <Button variant="secondary" >
                                            Close
                                        </Button>
                                    </Col>
                                    <Col md={1}>
                                        <Button variant="primary" type="submit" disabled={isSubmitting}> Register</Button>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Row>


                    </Form>
                )}
            </Formik>
            </div>
        </>
    )
}

export default ExpenseForm;

ExpenseForm.propTypes = exact({
    toggleRegisterModal: PropTypes.func,
    show: PropTypes.bool,
});