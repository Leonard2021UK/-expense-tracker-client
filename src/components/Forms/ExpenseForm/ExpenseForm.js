import React, {useEffect, useState} from "react";
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
import {setExpenseTrackerCategory} from "../../../redux/features/domain/expenseTrackerFormSlice";
import {setItemCategory} from "../../../redux/features/domain/itemFormSlice";
import {useResponse} from "../../../customHooks/useResponse";
import {useApiService} from "../../../services/useApiService";
import {useDispatch, useSelector} from "react-redux";
import {unitTypeThunk} from "../../../redux/features/suggestions/unitSuggestionSlice";
import {itemCategoryThunk} from "../../../redux/features/suggestions/itemCategorySuggestionSlice";
import {itemThunk} from "../../../redux/features/suggestions/itemSuggestionSlice";
const ExpenseForm = (props) =>{

    const {initialValue,disabled} = props;
    console.log(initialValue);
    const dispatch = useDispatch();

    const categoryMinLength = 3;
    const unitMinLength = 3;
    const expenseNameMinLength = 3;
    const itemNameMinLength = 3;

    const [itemTableData,setItemTableData] = useState([])

    let nonExistingItemCategoryOptionIsValid = false;
    let nonExistingUnitOptionIsValid = false;
    let nonExistingItemOptionIsValid = false;

    const [nonExistingUnitOption,setNonExistingUnitOption] = useState('');
    const [nonExistingCategoryOption,setNonExistingCategoryOption] = useState('');
    const [nonExistingItemOption,setNonExistingItemOption] = useState('');

    const [savedNewCategory,setSavedNewCategory] = useState([]);
    const [savedNewUnit,setSavedNewUnit] = useState([]);
    const [savedNewItem,setSavedNewItem] = useState([]);

    const [fetchingNewCategory,setFetchingNewCategory] = useState(false);
    const [fetchingNewUnit,setFetchingNewUnit] = useState(false);
    const [fetchingNewItem,setFetchingNewItem] = useState(false);

    const [handleNewCategoryResponse] = useResponse(setSavedNewCategory);
    const [handleNewUnitResponse] = useResponse(setSavedNewUnit);
    const [handleNewItemResponse] = useResponse(setSavedNewItem);

    const [createItemModalIsOpen,setCreateItemModalIsOpen] = useState(false);

    const {getAllItemCategories,getAllUnitTypes,getAllItems,saveItem} = useApiService();

    const rItemForm = useSelector((state) => state.itemForm.formState)

    const toggleCreateItemModal = ()=>{
        setCreateItemModalIsOpen(!createItemModalIsOpen);
    }

    useEffect(()=>{
        dispatch(unitTypeThunk())
        dispatch(itemCategoryThunk())
        dispatch(itemThunk())
    })

    const addTableRow = ()=>{
        console.log('adding table row')
        setItemTableData(prevState => ([...prevState,{
            "name": "",
            "amount": "",
            "unitPrice": "",
            "unitType": "",
            "itemCategory": ""
        }]))
    }

    const removeTableRow = ()=>{
        const lastRow = itemTableData[itemTableData.length-1];
        setItemTableData(itemTableData.filter(item => lastRow !== item))
    }

    const removeSelectedTableRow = (id)=>{
        const selectedRow = itemTableData[id];
        setItemTableData(itemTableData.filter(item => item !== selectedRow));
    }

    const updateTableRow = (selectedItem,rowId,suggestionName)=>{
        console.log(selectedItem)
        console.log(rowId)
        console.log(suggestionName)

        let prevState = [...itemTableData];
        prevState[rowId] = selectedItem[0];

        setItemTableData(prevState)
    }

    const validationSchema = Yup.object().shape({
        expenseName: Yup.string()
            .min(expenseNameMinLength,"Name must be at least "+ expenseNameMinLength + " characters")
            .max(50, "*Name must be less than 100 characters")
            .required("*Name is required")
    });

    return (
        <>
            <CreateItemModal show={createItemModalIsOpen} toggleModal={toggleCreateItemModal}/>
            <div style={{width:"80%",margin:"auto"}}>
            <Formik
                initialValues={{expenseName:_.isUndefined(initialValue) ? "" : initialValue.name}}
                validationSchema={validationSchema}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                    // When button submits form and form is in the process of submitting, submit button is disabled
                    setSubmitting(true);
                    console.log(values)
                    // UserService.register(values).then((response)=>{
                    //     console.log(response)
                    // })
                    // Resets form after submission is complete
                    // resetForm();

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
                                    name="expenseName"
                                    placeholder="Enter name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    defaultValue={_.isUndefined(initialValue) ? "" : initialValue.name}
                                    value={values.name}
                                    disabled={disabled}
                                    className={touched.expenseName && errors.expenseName ? "error" : null}
                                />
                                {touched.expenseName && errors.expenseName ? (
                                    <div className="error-message">{errors.expenseName}</div>
                                ): null}
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    defaultValue={_.isUndefined(initialValue) ? "" : initialValue.email}
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
                                    defaultValue={_.isUndefined(initialValue) ? "" : initialValue.phoneNumber}
                                    disabled={disabled}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridMobile">
                                <Form.Label>Mobile</Form.Label>
                                <Form.Control
                                    type="mobile"
                                    name="mobile"
                                    placeholder="Enter mobile number"
                                    defaultValue={_.isUndefined(initialValue) ? "" : initialValue.mobileNumber}
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
                                        <>
                                            <option selected={!disabled}>{_.isUndefined(initialValue) ? "" : initialValue.expenseAddress.name }</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </>

                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel controlId="floatingSelect" label="Payment type">
                                    <Form.Select
                                        aria-label="Floating label select example"
                                        disabled={disabled}
                                    >

                                        <>
                                            <option selected={!disabled}>{_.isUndefined(initialValue) ? "" : initialValue.expensePaymentType.name }</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </>

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


                                        <>
                                            <option selected={!disabled}>{_.isUndefined(initialValue) ? "" : initialValue.expenseType.name }</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </>

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
                                        defaultValue={_.isUndefined(initialValue) ? "" : initialValue.extraInfo}

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
                                        <TableToolBar add={addTableRow} remove={removeTableRow} toggleModal={toggleCreateItemModal}/>
                                        <Row>
                                            <ItemsTable
                                                data={_.isUndefined(initialValue) ? itemTableData : initialValue.expenseItems}
                                                errors={errors}
                                                touched={touched}
                                                handleChange={handleChange}
                                                handleBlur={handleBlur}
                                                updateTableRow={updateTableRow}
                                                setFieldValue={setFieldValue}
                                                setFieldTouched={setFieldTouched}
                                                removeSelectedTableRow={removeSelectedTableRow}
                                                setNonExistingUnitOption={setNonExistingUnitOption}
                                                setNonExistingCategoryOption={setNonExistingCategoryOption}
                                                setNonExistingItemOption={setNonExistingItemOption}
                                                nonExistingUnitOptionIsValid={nonExistingUnitOptionIsValid}
                                                nonExistingItemOptionIsValid={nonExistingItemOptionIsValid}
                                                nonExistingItemCategoryOptionIsValid={nonExistingItemCategoryOptionIsValid}
                                            />
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
    expense: PropTypes.array,
    disabled: PropTypes.bool,
});