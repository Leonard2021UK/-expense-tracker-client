import React, {useState} from "react";
import {Button, Col, FloatingLabel, Form, Modal, Row} from "react-bootstrap";
import {Formik} from "formik";
import * as Yup from 'yup';
import UserService from "../../../services/UserService";
import _ from "lodash";
import AutoSuggestion from "../../AutoSuggestion/AutoSuggestion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderPlus} from "@fortawesome/free-solid-svg-icons";

const ExpenseTrackerForm = (props) =>{


    const {expense,disable,mainCategories} = props;

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(3,"Name must be at least 3 characters")
            .max(50, "Name must be less than 50 characters")
            .required("Name is required"),
        category: Yup.string()
            .min(3,"Category must be at least 3 characters")
            .max(50, "Category must be less than 50 characters")
            .required("Category does not exists! Change or create new!"),
    });

    return (
        <>
            <div style={{width:"80%",margin:"auto"}}>
                <Formik
                    initialValues={{name:"", category:""}}
                    validationSchema={validationSchema}
                    onSubmit={(values, {setSubmitting, resetForm}) => {
                        // When button submits form and form is in the process of submitting, submit button is disabled
                        setSubmitting(true);
                        console.log(values)
                        alert("SUBMITTING")
                        // UserService.register(values).then((response)=>{
                        //     console.log(response)
                        // })
                        // Resets form after submission is complete
                        resetForm();

                        // Sets setSubmitting to false after form is reset
                        setSubmitting(false);
                    }}
                >
                    {(
                        {
                            handleSubmit,
                            handleChange,
                            handleBlur,
                            values,
                            touched,
                            errors,
                            isSubmitting,
                            setFieldValue,
                            setFieldTouched,
                        }
                    )=>(
                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGroupName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        placeholder="Enter name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                        disabled={disable}
                                        className={touched.name && errors.name ? "error" : null}
                                    />
                                    {touched.name && errors.name ? (
                                        <div className="error-message">{errors.name}</div>
                                    ): null}
                                </Form.Group>
                            </Row>
                            <Row style={{marginTop:5 + "vh"}}>
                                <Col className="form-control">
                                    {/*TODO non-existing category allows submit the form*/}
                                    <AutoSuggestion
                                        id="main-category"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        setFieldValue={setFieldValue}
                                        setFieldTouched={setFieldTouched}
                                        options={mainCategories}
                                        suggestionLabels={["name"]}
                                        className={touched.category && errors.category ? "error" : null}
                                    />
                                    <FontAwesomeIcon icon={faFolderPlus} className="fas fa-2x" color={"green"} style={{margin:1+"vh",cursor:"pointer"}} />

                                    {touched.category && errors.category ? (
                                        <div className="error-message">{errors.category}</div>
                                    ): null}
                                    {/*<FloatingLabel controlId="floatingSelect" label="Expense type">*/}
                                    {/*    <Form.Select*/}
                                    {/*        aria-label="Floating label select example"*/}
                                    {/*        disabled={false}*/}
                                    {/*    >*/}
                                    {/*        {disable ? <option>Test</option> :*/}
                                    {/*            (*/}
                                    {/*                <>*/}
                                    {/*                    <option>Select address</option>*/}
                                    {/*                    <option value="1">One</option>*/}
                                    {/*                    <option value="2">Two</option>*/}
                                    {/*                    <option value="3">Three</option>*/}
                                    {/*                </>*/}
                                    {/*            )}*/}
                                    {/*    </Form.Select>*/}
                                    {/*</FloatingLabel>*/}
                                </Col>
                            </Row>
                            <Row>
                                <Form.Group>
                                    <Row style={{marginTop:5 + "vh"}}>
                                        <Col md={1}>
                                            <Button variant="primary" type="submit" disabled={isSubmitting}> Create</Button>
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

export default ExpenseTrackerForm;


