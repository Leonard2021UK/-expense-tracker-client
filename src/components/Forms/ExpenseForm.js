import React, {useState} from "react";
import {Button, Col, FloatingLabel, Form, FormControl, InputGroup, Modal, Row, Table} from "react-bootstrap";
import exact from "prop-types-exact";
import PropTypes from "prop-types";
import LoginModal from "../Modals/LoginModal/LoginModal";
import {Formik} from "formik";
import * as Yup from 'yup';
import UserService from "../../services/UserService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookOpen, faTrash} from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";
import ItemTableRow from "../ItemsTable/ItemTableRow/ItemTableRow";
import ItemsTable from "../ItemsTable/ItemsTable";
import ItemsTableHeader from "../ItemsTable/ItemsTableHeader/ItemsTableHeader";
import AutoSuggestion from "../AutoSuggestion/AutoSuggestion";
import RowAction from "../RowAction/RowAction";
const ExpenseForm = (props) =>{

        const data = React.useMemo(
        () => [
            {
                firstName: 'Hello',
                lastName: 'World',
                age: Math.floor(Math.random() * 30),
                visits: Math.floor(Math.random() * 100),
                progress: Math.floor(Math.random() * 100),
                status: 77
            },
            {
                firstName: 'react-table',
                lastName: 'rocks',
                age: Math.floor(Math.random() * 30),
                visits: Math.floor(Math.random() * 100),
                progress: Math.floor(Math.random() * 100),
                status: 77
            },
            {
                firstName: 'whatever',
                lastName: 'you want',
                age: Math.floor(Math.random() * 30),
                visits: Math.floor(Math.random() * 100),
                progress: Math.floor(Math.random() * 100),
                status: 77
            },
        ],
        []
    )

    const columns = React.useMemo(
        () => [
            {
                Header: <ItemsTableHeader id="itemInfo" name="itemInfo" title = "Item information"/>,
                columns: [
                    {
                        Header: <ItemsTableHeader id="itemNr" name="itemNr" title = "Item Nr."/>,
                        id:"id",
                        accessor: 'itemNr',
                        Cell:(props)=>{
                            const rowId = parseInt(props.row.id)+1;
                            return(
                                <div className="item_number" id={"row_" + rowId}>
                                    {rowId}
                                </div>
                            )}
                    },
                    {
                        Header: <ItemsTableHeader id="itemName" name="itemName" title = "Item name"/>,
                        id:"id",
                        accessor: 'itemName',
                        Cell:()=>{
                            return(
                                <AutoSuggestion/>
                            )}
                    },
                    {
                        Header: <ItemsTableHeader id="amount" name="amount" title = "Amount"/>,
                        accessor: 'amount',
                        Cell:()=>{
                            return(
                                <InputGroup>
                                    <FormControl/>
                                </InputGroup>
                            )}
                    },
                    {
                        Header: <ItemsTableHeader id="unit" name="unit" title = "Unit"/>,
                        accessor: 'unit',
                        Cell:()=>{
                            return(
                                <AutoSuggestion/>
                            )}
                    },
                    {
                        Header: <ItemsTableHeader id="unitPrice" name="unitPrice" title = "Unit price"/>,
                        id:"id",
                        accessor: 'unitPrice',
                        Cell:()=>{
                            return(
                                <InputGroup>
                                    <FormControl/>
                                </InputGroup>
                            )}
                    },
                    {
                        Header: <ItemsTableHeader id="itemCategory" name="itemCategory" title = "Category"/>,
                        accessor: 'itemCategory',
                        Cell:()=>{
                            return(
                                <AutoSuggestion/>
                            )}
                    },
                    {
                        Header: <ItemsTableHeader id="totalPrice" name="totalPrice" title = "Total price"/>,
                        id:"id",
                        accessor: 'totalPrice',
                        Cell:()=>{
                            return(
                                <InputGroup>
                                    <FormControl/>
                                </InputGroup>
                            )}
                    }
                ],
            },
            {
                Header: <ItemsTableHeader id="actions" name="actions" title = "Actions"/>,
                columns: [
                    {
                        Header: <ItemsTableHeader id="itemDetails" name="itemDetails" title = "Details"/>,
                        id:"id",
                        accessor: 'age',
                        Cell:()=>{
                            return(
                                <RowAction con={faBookOpen} color={"green"}/>
                            )}
                    },
                    {
                        Header: <ItemsTableHeader id="itemUpdate" name="itemUpdate" title = "Update"/>,
                        id:"id",
                        accessor: 'visits',
                        Cell:()=>{
                            return(
                                <RowAction icon={faBookOpen} className="mr-2" color={"orange"}/>
                            )}
                    },
                    {
                        Header: <ItemsTableHeader id="itemRemove" name="itemRemove" title = "Remove"/>,
                        id:"id",
                        accessor: 'visits',
                        Cell:()=>{
                            return(
                                <RowAction icon={faTrash} color={"red"}/>
                            )}
                    }
                ],
            },
        ],
        []
    )
    const {expense,disable} = props;
    console.log("EXPENSEE")
    console.log(expense)
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
                initialValues={{name:_.isUndefined(expense)?"":expense.name}}
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
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    defaultValue={expense.email}
                                    disabled={disable}

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
                                    defaultValue={expense.phoneNumber}
                                    disabled={disable}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridMobile">
                                <Form.Label>Mobile</Form.Label>
                                <Form.Control
                                    type="mobile"
                                    name="mobile"
                                    placeholder="Enter mobile number"
                                    defaultValue={expense.mobileNumber}
                                    disabled={disable}
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Col>
                                <FloatingLabel controlId="floatingSelect" label="Address">
                                    <Form.Select
                                        aria-label="Floating label select example"
                                        disabled={disable}
                                    >
                                        {disable ? <option>{expense.expenseAddress.name}</option> :
                                            (
                                                <>
                                                    <option>Select address</option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </>
                                            )}
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel controlId="floatingSelect" label="Payment type">
                                    <Form.Select
                                        aria-label="Floating label select example"
                                        disabled={disable}
                                    >
                                        {disable ? <option>{expense.expensePaymentType.name}</option> :
                                            (
                                                <>
                                                    <option>Select address</option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </>
                                            )}
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row style={{marginTop:5 + "vh"}}>
                             <Col>
                                <FloatingLabel controlId="floatingSelect" label="Expense type">
                                    <Form.Select
                                        aria-label="Floating label select example"
                                        disabled={disable}
                                    >
                                        {disable ? <option>{expense.expensePaymentType.name}</option> :
                                            (
                                                <>
                                                    <option>Select address</option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </>
                                            )}
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                        </Row>

                        <Row style={{marginTop:5 + "vh",marginBottom:5 + "vh"}}>
                            <Col>
                                <FloatingLabel controlId="floatingTextarea" label="Comments">
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Leave a comment here"
                                        disabled={disable}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row>
                            <Modal.Header closeButton>
                                <Modal.Title>Items submitted </Modal.Title>
                            </Modal.Header>
                        </Row>
                        <Row>
                            {/*<Table striped bordered hover variant="dark">*/}

                            {/*    <thead>*/}
                            {/*    <tr>*/}
                            {/*        <th scope="col">#</th>*/}
                            {/*        <th scope="col">Item name</th>*/}
                            {/*        <th scope="col">Amount</th>*/}
                            {/*        <th scope="col">Unit</th>*/}
                            {/*        <th scope="col">Unit price</th>*/}
                            {/*        <th scope="col">Category</th>*/}
                            {/*        <th scope="col">Price in total</th>*/}
                            {/*        <th scope="col">Actions</th>*/}
                            {/*    </tr>*/}
                            {/*    </thead>*/}
                            {/*    <tbody>*/}
                            {/*    {expense.items.map((item,index)=>{*/}
                            {/*        return <>*/}
                            {/*            <tr>*/}
                            {/*                <ItemTableRow/>*/}
                            {/*            </tr>*/}

                            {/*        </>*/}
                            {/*    })}*/}
                            {/*    </tbody>*/}
                            {/*</Table>*/}
                            <ItemsTable columns={columns} data={expense.items}/>
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