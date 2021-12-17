import React, {useState} from "react";
import {Accordion, Button, Col, FloatingLabel, Form, FormControl, InputGroup, Modal, Row, Table} from "react-bootstrap";
import exact from "prop-types-exact";
import PropTypes from "prop-types";
import "./expenseFormStyle.css";
import LoginModal from "../../Modals/LoginModal/LoginModal";
import {Formik} from "formik";
import * as Yup from 'yup';
import UserService from "../../../services/UserService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookOpen, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";
import ItemTableRow from "../../ItemsTable/ItemTableRow/ItemTableRow";
import ItemsTable from "../../ItemsTable/ItemsTable";
import ItemsTableHeader from "../../ItemsTable/ItemsTableHeader/ItemsTableHeader";
import AutoSuggestion from "../../AutoSuggestion/AutoSuggestion";
import RowAction from "../../RowAction/RowAction";
import TableToolBar from "../../TableToolBars/TableToolBar";
import CreateItemModal from "../../Modals/CreateItemModal/CreateItemModal";
const ExpenseForm = (props) =>{

    const {expense,disabled} = props;

    const [createItemModalIsOpen,setCreateItemModalIsOpen] = useState(false);

    const toggleCreateItemModal = ()=>{
        setCreateItemModalIsOpen(!createItemModalIsOpen);
    }

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
                id:"id1",
                Header: <ItemsTableHeader id="itemInfo" name="itemInfo" title = "Item information"/>,
                columns: [
                    {
                        Header: <ItemsTableHeader id="itemNr" name="itemNr" title = "Item Nr."/>,
                        id:"id11",
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
                        id:"id12",
                        accessor: 'itemName',
                        Cell:()=>{
                            return(
                                <AutoSuggestion options={[]}/>
                            )}
                    },
                    {
                        Header: <ItemsTableHeader id="amount" name="amount" title = "Amount"/>,
                        id:"id13",
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
                        id:"id14",
                        accessor: 'unit',
                        Cell:()=>{
                            return(
                                <AutoSuggestion options={[]}/>
                            )}
                    },
                    {
                        Header: <ItemsTableHeader id="unitPrice" name="unitPrice" title = "Unit price"/>,
                        id:"id15",
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
                        id:"id16",
                        accessor: 'itemCategory',
                        Cell:()=>{
                            return(
                                <AutoSuggestion options={[]}/>
                            )}
                    },
                    {
                        Header: <ItemsTableHeader id="totalPrice" name="totalPrice" title = "Total price"/>,
                        id:"id17",
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
                id:"id3",
                Header: <ItemsTableHeader id="actions" name="actions" title = "Actions"/>,
                headerClassName:"text-center",
                columns: [
                    {
                        Header: <ItemsTableHeader id="itemDetails" name="itemDetails" title = "Details"/>,
                        headerClassName:"text-center",
                        id:"id18",
                        accessor: 'visits',
                        Cell:()=>{
                            return(
                                <RowAction icon={faBookOpen} color={"green"} className="text-center"/>
                            )}
                    },
                    {
                        Header: <ItemsTableHeader id="itemUpdate" name="itemUpdate" title = "Update"/>,
                        id:"id19",
                        accessor: 'visits',
                        Cell:()=>{
                            return(
                                <RowAction icon={faEdit} className="mr-2" color={"orange"}/>
                            )}
                    },
                    {
                        Header: <ItemsTableHeader id="itemRemove" name="itemRemove" title = "Remove"/>,
                        id:"id20",
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


    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(3,"*name must be at least 3 characters")
            .max(50, "*Name must be less than 100 characters")
            .required("*Name is required")
    });

    return (
        <>
            <CreateItemModal show={createItemModalIsOpen} toggleModal={toggleCreateItemModal}/>
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
                                    disabled={disabled}
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
                                    defaultValue={_.isUndefined(expense)?"":expense.email}
                                    disabled={disabled}

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
                                    defaultValue={_.isUndefined(expense)?"":expense.phone}
                                    disabled={disabled}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridMobile">
                                <Form.Label>Mobile</Form.Label>
                                <Form.Control
                                    type="mobile"
                                    name="mobile"
                                    placeholder="Enter mobile number"
                                    defaultValue={_.isUndefined(expense)?"":expense.mobile}
                                    disabled={disabled}
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Col>
                                <FloatingLabel controlId="floatingSelect" label="Address">
                                    <Form.Select
                                        aria-label="Floating label select example"
                                        disabled={disabled}
                                    >
                                        {disabled ? <option>{_.isUndefined(expense)?"":expense.expenseAddress.name}</option> :
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
                                        disabled={disabled}
                                    >
                                        {disabled ? <option>{_.isUndefined(expense)?"":expense.expensePaymentType.name}</option> :
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
                                        disabled={disabled}
                                    >
                                        {disabled ? <option>{_.isUndefined(expense)?"":expense.expensePaymentType.name}</option> :
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
                                        disabled={disabled}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        {/*<Row>*/}
                        {/*    <Modal.Header closeButton>*/}
                        {/*        <Modal.Title>Items submitted </Modal.Title>*/}
                        {/*    </Modal.Header>*/}
                        {/*</Row>*/}
                        <Row >
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Items</Accordion.Header>
                                    <Accordion.Body>
                                        <TableToolBar toggleModal={toggleCreateItemModal}/>
                                        <Row>
                                            <ItemsTable columns={columns} data={[
                                                {
                                                "id": null,
                                                "createdBy": null,
                                                "updatedBy": null,
                                                "name": "neyw",
                                                "amount": null,
                                                "unitPrice": null,
                                                "user": null,
                                                "unitType": null,
                                                "itemCategory": null,
                                                "createdAt": null,
                                                "updatedAt": null,
                                                "archived": false
                                            }
                                            ]}/>
                                        </Row>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
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