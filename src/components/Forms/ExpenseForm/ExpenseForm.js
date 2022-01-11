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
import {setExpenseTrackerCategory} from "../../../redux/features/domain/forms/expenseTrackerFormSlice";
import {clearItemForm, setItemCategory} from "../../../redux/features/domain/forms/itemFormSlice";
import {useResponse} from "../../../customHooks/useResponse";
import {useApiService} from "../../../services/useApiService";
import {useDispatch, useSelector} from "react-redux";
import {unitTypeThunk} from "../../../redux/features/suggestions/unitSuggestionSlice";
import {itemCategoryThunk} from "../../../redux/features/suggestions/itemCategorySuggestionSlice";
import {itemThunk} from "../../../redux/features/suggestions/itemSuggestionSlice";
import {expenseAddressThunk} from "../../../redux/features/suggestions/expenseAddressSuggestionSlice";
import {expensePaymentTypeThunk} from "../../../redux/features/suggestions/expensePaymentTypeSuggestionSlice";
import {expenseTypeThunk} from "../../../redux/features/suggestions/expenseTypeSuggestionSlice";
import {setItemTableState,addRow,removeRow,removeSelectedRow,clearItemTableState} from "../../../redux/features/domain/tables/itemsTableSlice";
import {setOwnerExpenseTracker,setExpenseFormState, setExpenseName, setExpenseEmail, setExpensePhone, setExpenseMobile, setExpenseAddress, setExpensePaymentType, setExpenseType, setExpenseComment, clearExpenseForm} from "../../../redux/features/domain/forms/expenseFormSlice";
import {expenseTrackersInValidate, expenseTrackerThunk} from "../../../redux/features/domain/expenseTrackerSlice";


const ExpenseForm = (props) =>{

    const {initialValue,ownerExpenseTracker,disable,toggleModal} = props;
    console.log("INITIAL VALUE IN EXPENSE FORM: ",initialValue)

    const dispatch = useDispatch();

    const categoryMinLength = 3;
    const unitMinLength = 3;
    const expenseNameMinLength = 3;
    const itemMinLength = 3;

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

    const [newRowData,setNewRowData] = useState({});

    const [fetchingNewCategory,setFetchingNewCategory] = useState(false);
    const [fetchingNewUnit,setFetchingNewUnit] = useState(false);
    const [fetchingNewItem,setFetchingNewItem] = useState(false);
    const [fetchingExpense,setFetchingExpense] = useState(false);

    const [handleNewCategoryResponse] = useResponse(setSavedNewCategory);
    const [handleNewUnitResponse] = useResponse(setSavedNewUnit);
    const [handleNewItemResponse] = useResponse(setSavedNewItem);
    const [handleExpenseResponse] = useResponse();

    const [createItemModalIsOpen,setCreateItemModalIsOpen] = useState(false);

    const {saveExpense,getAllItemCategories,getAllUnitTypes,getAllItems,saveItem} = useApiService();

    const rItemForm = useSelector((state) => state.itemForm.formState)
    const rItemTableData = useSelector((state) => state.itemsTable.tableState)
    const rExpenseForm = useSelector((state) => state.expenseForm.formState);

    const rExpenseAddresses = useSelector((state) => state.suggestions.expenseAddress.response);
    const rExpensePaymentType= useSelector((state) => state.suggestions.expensePaymentType.response);
    const rExpenseType = useSelector((state) => state.suggestions.expenseType.response);
    const rItemCategories = useSelector((state) => state.suggestions.itemCategory.response);
    const rUnitTypes = useSelector((state) => state.suggestions.unitType.response);
    const rItems = useSelector((state) => state.suggestions.item.response);

    const toggleCreateItemModal = ()=>{
        setCreateItemModalIsOpen(!createItemModalIsOpen);
        // dispatch(clearExpenseForm())
        dispatch(clearItemForm())
    }

    useEffect(()=>{
        dispatch(unitTypeThunk())
        dispatch(itemCategoryThunk())
        dispatch(itemThunk())
        dispatch(expenseTypeThunk())
        dispatch(expenseAddressThunk())
        dispatch(expensePaymentTypeThunk())
        console.log("ownerExpenseTracker VALUE IN EXPENSE FORM: ",ownerExpenseTracker)

        // when ownerExpenseTracker is present and no initial value was provided then initialize the form owner with the ownerExpenseTracker data
        if(!_.isUndefined(ownerExpenseTracker && _.isUndefined(initialValue)) ){
            dispatch(setOwnerExpenseTracker({expenseTracker:ownerExpenseTracker}))
        }else {
            dispatch(setExpenseFormState({formState:initialValue}))
        }

    },[])

    const prepareNewRow = (newRowData) =>{

    }

    console.log("rITEM TABLE DATA VALUE IN EXPENSEFORM ", rItemTableData)
    const addTableRow = ()=>{

        setCreateItemModalIsOpen(true)
        // dispatch(addRow({
        //     row:{
        //         "unitType": "",
        //         "itemCategory": "",
        //         "rowId":rItemTableData.length,
        //         "item":"",
        //         "amount":"",
        //         "unitPrice":"",
        //         "price":""
        //     }
        // }))
    }

    const removeTableRow = ()=>{
        dispatch(removeRow())

    }

    const clearTable = () =>{
        dispatch(clearItemTableState())
    }

    const removeSelectedTableRow = (id)=>{
        dispatch(removeSelectedRow({id:id}))
    }

    const handleFormFieldOnBlur = (e) => {
        const inputType = e.target.type;
        let name = e.target.name;
        let value = e.target.value;
        switch (true){
            case (name === "expenseName" ):
                dispatch(setExpenseName({[name]:value}))
                break;
            case (name === "expenseEmail" ):
                dispatch(setExpenseEmail({[name]:value}))
                break;
            case (name === "expensePhone" ):
                dispatch(setExpensePhone({[name]:value}))
                break;
            case (name === "expenseMobile" ):
                dispatch(setExpenseMobile({[name]:value}))
                break;
            case (name === "expensePaymentType" ):
                dispatch(setExpensePaymentType({[name]:value}))
                break;
            case (name === "expenseType" ):
                dispatch(setExpenseType({[name]:value}))
                break;
            case (name === "expenseAddress" ):
                dispatch(setExpenseAddress({[name]:value}))
                break;
            case (name === "expenseComment" ):
                dispatch(setExpenseComment({[name]:value}))
                break;

        }
    }

    const validationSchema = Yup.object().shape({
        expenseName: Yup.string()
            .min(expenseNameMinLength,"Name must be at least "+ expenseNameMinLength + " characters")
            .max(50, "Name must be less than 50 characters")
            .required("Name is required")
    });

    return (
        <>
            <CreateItemModal show={createItemModalIsOpen} toggleModal={toggleCreateItemModal} setNewRowData={setNewRowData} rItemTableData={rItemTableData}/>
            <div style={{width:"80%",margin:"auto"}}>
            <Formik
                initialValues={{
                    expenseName:_.isUndefined(initialValue) ? "" : initialValue.expenseName,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                    // When button submits form and form is in the process of submitting, submit button is disabled
                    // setSubmitting(true);

                    console.log("SUBMIT")

                    // rExpenseForm["expenseItems"] = "HELLO";
                    // let reqBody = {};
                    // reqBody["expenseForm"] = _.clone(rExpenseForm);
                    // reqBody["expenseForm"]['expenseItems'] = _.clone(rItemTableData)
                    // console.log(reqBody)
                    const reqBody = {
                        "expenseForm":rExpenseForm,
                        "items":rItemTableData,
                    }

                    setFetchingExpense(true);
                    const method = _.isUndefined(initialValue) ? "PATCH" : "POST"

                    saveExpense("POST",reqBody)
                        .then(async (response) =>{
                            console.log("SUBMIT")
                            console.log(response)
                            if(response.ok){
                                toggleModal();
                                handleExpenseResponse(response,"New expense was successfully created!")
                                dispatch(expenseTrackersInValidate({data:true}))
                                dispatch(expenseTrackerThunk())
                                dispatch(clearExpenseForm())
                                dispatch(clearItemTableState())
                            }else{
                                handleExpenseResponse(response, null,"New expense couldn't be created!")
                            }
                            //TODO error handling
                        }).then(()=>{
                        setFetchingExpense(false);
                    })
                    // UserService.register(values).then((response)=>{
                    //     console.log(response)
                    // })
                    // Resets form after submission is complete
                    // resetForm();

                    // Sets setSubmitting to false after form is reset
                    setSubmitting(false);
                }}
            >
                {
                    (
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
                    )=>
                    {
                        console.log("FORMIK ERROR VALUES IN EXPENSE FORM : ", errors)
                        console.log("FORMIK TOUCHED VALUES IN EXPENSE FORM : ", touched)

                        return     (
                            <Form onSubmit={handleSubmit}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGroupName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="expenseName"
                                            placeholder="Enter name"
                                            onChange={handleChange}
                                            onBlur={(e)=>handleFormFieldOnBlur(e,values.name)}
                                            defaultValue={_.isUndefined(initialValue) ? "" : initialValue.expenseName}
                                            value={values.name}
                                            disabled={disable}
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
                                            name="expenseEmail"
                                            placeholder="Enter email"
                                            defaultValue={_.isUndefined(initialValue) ? "" : initialValue.expenseEmail}
                                            disabled={disable}
                                            onBlur={(e)=>handleFormFieldOnBlur(e,values.name)}

                                        />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridPhone">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control
                                            type="phone"
                                            name="expensePhone"
                                            placeholder="Enter phone number"
                                            defaultValue={_.isUndefined(initialValue) ? "" : initialValue.expensePhone}
                                            disabled={disable}
                                            onBlur={(e)=>handleFormFieldOnBlur(e,values.name)}

                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridMobile">
                                        <Form.Label>Mobile</Form.Label>
                                        <Form.Control
                                            type="mobile"
                                            name="expenseMobile"
                                            placeholder="Enter mobile number"
                                            defaultValue={_.isUndefined(initialValue) ? "" : initialValue.expenseMobile}
                                            disabled={disable}
                                            onBlur={(e)=>handleFormFieldOnBlur(e,values.name)}

                                        />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Col>
                                        <FloatingLabel controlId="floatingSelect" label="Address">
                                            <Form.Select
                                                aria-label="Floating label select example"
                                                disabled={disable}
                                                name="expenseAddress"
                                                onBlur={(e)=>handleFormFieldOnBlur(e,values.name)}
                                            >
                                                <>
                                                    <option >Choose an address</option>
                                                    {
                                                        rExpenseAddresses.map((address)=>{
                                                            const isSelected = _.isUndefined(initialValue) ? false : initialValue.expenseAddress.name === address.name
                                                            return <option selected={isSelected} value={JSON.stringify(address)}>{address.name}</option>

                                                        })
                                                    }
                                                </>

                                            </Form.Select>
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel controlId="floatingSelect" label="Payment type">
                                            <Form.Select
                                                aria-label="Floating label select example"
                                                disabled={disable}
                                                name="expensePaymentType"
                                                onBlur={(e)=>handleFormFieldOnBlur(e,values.name)}

                                            >
                                                <>
                                                    <option >Choose an payment type</option>
                                                    {rExpensePaymentType.map((expensePaymentType)=>{
                                                        const isSelected = _.isUndefined(initialValue) ? false : initialValue.expenseAddress.name === expensePaymentType.name
                                                        return <option selected={isSelected} value={JSON.stringify(expensePaymentType)}>{expensePaymentType.name}</option>

                                                    })}
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
                                                disabled={disable}
                                                name="expenseType"
                                                onBlur={(e)=>handleFormFieldOnBlur(e,values.name)}
                                            >
                                                <>
                                                    <option >Choose an expense type</option>
                                                    {
                                                        rExpenseType.map((expenseType)=>{
                                                            const isSelected = _.isUndefined(initialValue) ? false : initialValue.expenseAddress.name === expenseType.name
                                                            return <option selected={isSelected} value={JSON.stringify(expenseType)}>{expenseType.name}</option>
                                                        })
                                                    }
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
                                                name="expenseComment"
                                                placeholder="Leave a comment here"
                                                disabled={disable}
                                                defaultValue={_.isUndefined(initialValue) ? "" : initialValue.expenseComment}
                                                onBlur={(e)=>handleFormFieldOnBlur(e,values.name)}
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
                                                <TableToolBar clear= {clearTable} add={addTableRow} remove={removeTableRow} toggleModal={toggleCreateItemModal} disable={disable}/>
                                                <Row>
                                                    <ItemsTable
                                                        data={_.isUndefined(initialValue) ? rItemTableData : initialValue.expenseItems}
                                                        errors={errors}
                                                        formikValues={values}
                                                        disable={disable}
                                                        touched={touched}
                                                        handleChange={handleChange}
                                                        handleBlur={handleBlur}
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
                                                <Button variant="secondary" onClick={toggleModal}>
                                                    {(!disable) ? "Cancel": "Close"}
                                                </Button>
                                            </Col>
                                            {
                                                (!disable) ?
                                                    <Col md={1}>
                                                        <Button variant="primary" type="submit" disabled={isSubmitting}>Submit</Button>
                                                    </Col> : null
                                            }

                                        </Row>
                                    </Form.Group>
                                </Row>


                            </Form>
                        )
                    }
                }
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