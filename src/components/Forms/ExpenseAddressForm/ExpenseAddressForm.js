import React, {useEffect, useRef, useState} from "react";
import {
    Button,
    Col,
    FloatingLabel,
    Form,
    FormControl,
    InputGroup,
    Modal,
    Row,
    Spinner,
    ToastContainer
} from "react-bootstrap";
import {Formik} from "formik";
import * as Yup from 'yup';
import {itemCategoryThunk,itemCategoryInValidate} from "../../../redux/features/suggestions/itemCategorySuggestionSlice";
import {unitTypeThunk,unitTypeInValidate} from "../../../redux/features/suggestions/unitSuggestionSlice";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import './expenseAddressFormStyle.css';
import AutoSuggestion from "../../AutoSuggestion/AutoSuggestion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderPlus} from "@fortawesome/free-solid-svg-icons";
import {useApiService} from "../../../services/useApiService";
import {
    setAmount,
    setItemCategory,
    setItemFormState,
    clearItemForm,
    setItem, setPrice, setUnitType, setUnitPrice
} from "../../../redux/features/domain/forms/itemFormSlice";
import {useResponse} from "../../../customHooks/useResponse";
import {itemThunk} from "../../../redux/features/suggestions/itemSuggestionSlice";
import TableAutoSuggestion from "../../TableAutoSuggestion/TableAutoSuggestion";
import CustomTableInputField from "../../CustomTableInputField/CustomTableInputField";
import {
    addRow,
    setRowId,
    updateSelectedRow
} from "../../../redux/features/domain/forms/expenseFormSlice";
import {itemInValidate} from "../../../redux/features/suggestions/itemSuggestionSlice";
import {
    expenseAddressInValidate,
    expenseAddressThunk
} from "../../../redux/features/suggestions/expenseAddressSuggestionSlice";

const ExpenseAddressForm = (props) =>{


    const dispatch = useDispatch();

    const itemMinLength = 3;
    const postCodeMinLength = 2;

    const {toggleModal} = props;

    const [fetchingExpenseAddress,setFetchingExpenseAddress] = useState(false);
    const [savedExpenseAddress,setSavedExpenseAddress] = useState({});

    const [handleNewExpenseAddressResponse] = useResponse(setSavedExpenseAddress);

    const {saveExpenseAddress} = useApiService();






    // if item is used as a table row initialize rowId
    // useEffect(() => {
    //     if (!_.isUndefined(rItemTableData)) {
    //         dispatch(setRowId({"rowId": rItemTableData.length}))
    //     }
    // },[rItemTableData.expenseItems])
    //
    // const handleCreateNewCategory = ()=>{
    //     const reqBody = {
    //         "name":nonExistingItemCategoryOption
    //     }
    //     setFetchingNewItemCategory(true);
    //
    //     saveItemCategory(reqBody)
    //         .then(async (response)=>{
    //             if(response.ok){
    //                 handleNewItemCategoryResponse(response, "New category was successfully created!")
    //                 // setSavedNewMainCategory( [parsedResponse]);
    //                 dispatch(itemCategoryInValidate({data:true}));
    //                 dispatch(itemCategoryThunk());
    //
    //             }else {
    //                 handleNewItemCategoryResponse(response, null,"New category couldn't be created!")
    //             }
    //             setFetchingNewItemCategory(false);
    //
    //         })
    // }
    //
    // const handleCreateNewUnit = ()=>{
    //     const reqBody = {
    //         "name":nonExistingUnitOption
    //     }
    //     setFetchingNewUnit(true);
    //
    //     saveUnitType("POST",reqBody)
    //         .then(async (response)=>{
    //             if(response.ok){
    //                 handleNewUnitResponse(response, "New unit type was successfully created!")
    //                 // setSavedNewMainCategory( [parsedResponse]);
    //                 dispatch(unitTypeInValidate({data:true}));
    //                 dispatch(unitTypeThunk());
    //
    //             }else {
    //                 handleNewUnitResponse(response, null,"New unit type couldn't be created!")
    //             }
    //             setFetchingNewUnit(false);
    //
    //         })
    // }

    // const handleCreateNewItem = ()=>{
    //     const reqBody = {
    //         "name":nonExistingItemOption
    //     }
    //     setFetchingNewItem(true);
    //
    //     saveItem(reqBody)
    //         .then(async (response)=>{
    //             if(response.ok){
    //                 handleNewItemResponse(response, "New item was successfully created!")
    //                 // setSavedNewMainCategory( [parsedResponse]);
    //                 dispatch(itemInValidate({data:true}));
    //                 dispatch(itemThunk());
    //
    //             }else {
    //                 handleNewItemResponse(response, null,"New item couldn't be created!")
    //             }
    //             setFetchingNewItem(false);
    //         })
    // }
    //

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(itemMinLength,"Name must be at least " + itemMinLength + " characters")
            .max(50, "Name must be less than 50 characters")
            .required("Name is required!"),
        postCode: Yup.string()
            .min(postCodeMinLength,"Name must be at least " + postCodeMinLength + " characters")
            .max(50, "Name must be less than 50 characters")
            .required("Name is required!")
    });
    //
    useEffect(()=>{
        //TODO check lodash is necessary
        // if(!_.isEmpty(nonExistingItemCategoryOption) && nonExistingItemCategoryOption.length >= itemCategoryMinLength ){
        //     nonExistingItemCategoryOptionIsValid = true;
        // }
    })
    // const handleSuggestionChange = (selectedItem,rowId,suggestionName) =>{
    //         setFieldValue(selectedItem)
    //         dispatch(updateSelectedRow({
    //             rowId:rowId,
    //             fieldName:suggestionName,
    //             value:selectedItem
    //         }))
    //
    //
    // }
    //
    // const updateCurrentRowItemFormState = (event,value) => {
    //     const name = event.target.name;
    //     switch(name){
    //         case("item"):
    //             dispatch(setItem({"item":value}));
    //             break;
    //         case("itemCategory"):
    //             dispatch(setItemCategory({"itemCategory":value}))
    //             break;
    //         case("unitType"):
    //             dispatch(setUnitType({"unitType":value}));
    //             break;
    //         case("amount"):
    //             dispatch(setAmount({"amount":value}));
    //             break;
    //         case("unitPrice"):
    //             dispatch(setUnitPrice({"unitPrice":value}));
    //             break;
    //         case("price"):
    //             dispatch(setPrice({"price":value}));
    //             break;
    //     }
    //     console.log("EVENT TARGET NAME VALUE IN ITEM FORM ",event)
    //     console.log("NEW ROW DATA VALUE IN ITEM FORM ",value)
    // }
    // const updateTableRow = (selectedItem,rowId,suggestionName)=>{
    //     // setFieldValue(selectedItem)
    //     dispatch(updateSelectedRow({
    //         rowId:rowId,
    //         fieldName:suggestionName,
    //         value:selectedItem
    //     }))

    // }

    return (
        <>
            <div style={{width:"80%",margin:"auto"}}>
                <Formik
                    initialValues={{
                        name:"",
                        postCode:"",
                        addressLine1:"",
                        addressLine2:"",
                        city:"",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, {setSubmitting, resetForm}) => {
                        // When button submits form and form is in the process of submitting, submit button is disabled
                        setSubmitting(true);
                        console.log(values)
                        // dispatch(setRowId({"rowId": rItemTableData.length}))

                        // dispatch(addRow({
                        //     row:rItemForm,rowId:rItemTableData.length
                        // }))

                        // dispatch(clearItemForm())
                        // const reqBody = {
                        //     "name":rItemForm.item,
                        //     "amount":rItemForm.amount,
                        //     "unitPrice":rItemForm.unitPrice,
                        //     "unitType":rItemForm.unitType[0].id,
                        //     "mainCategoryId":rItemForm.itemCategory[0].id
                        // }
                        setFetchingExpenseAddress(true);
                        saveExpenseAddress("POST",values)
                            .then(async (response)=>{
                                if(response.ok){
                                    toggleModal();
                                    handleNewExpenseAddressResponse(response, "New address was successfully created!")
                        //             // let parsedResponse = await response.json();
                        //             // setSavedNewMainCategory( [parsedResponse]);
                                    dispatch(expenseAddressInValidate({data:true}));
                                    dispatch(expenseAddressThunk());
                                }else{
                                    toggleModal();
                                    handleNewExpenseAddressResponse(response, null,"New item couldn't be created!")
                        //
                                }
                        //         //TODO error handling
                            }).then(()=>{
                            setFetchingExpenseAddress(false);
                        //setFetchingExpenseAddress
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
                            <Row className="mb-3" >
                                <Form.Group as={Col}>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        placeholder="Enter name"
                                        // onBlur={(e)=>{
                                        //     handleBlur(e)
                                        //     return updateCurrentRowItemFormState(e,e.target.value);
                                        // }}
                                        // disabled={disable}
                                        onChange={handleChange}
                                        className={(_.isUndefined(touched) && _.isUndefined(errors)) ? null : touched["name"] && errors["name"] ? "error" : null}
                                    />
                                    {(_.isUndefined(touched) && _.isUndefined(errors)) ? null : touched["name"] && errors["name"] ? (
                                        <div className="error-message">{errors["name"] }</div>
                                    ): null}
                                </Form.Group>
                            </Row>
                            <Row className="mb-3" >
                                <Form.Group as={Col}>
                                    <Form.Label>Address line 1.</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="addressLine1"
                                        placeholder="Enter address line 1"
                                        // onBlur={(e)=>{
                                        //     // handleBlur(e)
                                        //     return updateCurrentRowItemFormState(e,e.target.value);
                                        // }}
                                        // disabled={disable}
                                        onChange={handleChange}
                                        className={(_.isUndefined(touched) && _.isUndefined(errors)) ? null : touched["address_line1"] && errors["address_line1"] ? "error" : null}
                                    />
                                    {(_.isUndefined(touched) && _.isUndefined(errors)) ? null : touched["address_line1"] && errors["address_line1"] ? (
                                        <div className="error-message">{errors["address_line1"] }</div>
                                    ): null}
                                </Form.Group>
                            </Row>
                            <Row className="mb-3" >
                                <Form.Group as={Col}>
                                    <Form.Label>Address line 2.</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="addressLine2"
                                        placeholder="Enter address line 2"
                                        // onBlur={(e)=>{
                                        //     // handleBlur(e)
                                        //     return updateCurrentRowItemFormState(e,e.target.value);
                                        // }}
                                        // disabled={disable}
                                        onChange={handleChange}
                                        className={(_.isUndefined(touched) && _.isUndefined(errors)) ? null : touched["address_line2"] && errors["address_line2"] ? "error" : null}
                                    />
                                    {(_.isUndefined(touched) && _.isUndefined(errors)) ? null : touched["address_line2"] && errors["v"] ? (
                                        <div className="error-message">{errors["address_line2"] }</div>
                                    ): null}
                                </Form.Group>
                            </Row>
                            <Row className="mb-3" >
                                <Form.Group as={Col}>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="city"
                                        placeholder="City"
                                        // onBlur={(e)=>{
                                        //     handleBlur(e)
                                        //     return updateCurrentRowItemFormState(e,e.target.value);
                                        // }}
                                        // disabled={disable}
                                        onChange={handleChange}
                                        className={(_.isUndefined(touched) && _.isUndefined(errors)) ? null : touched["city"] && errors["city"] ? "error" : null}
                                    />
                                    {(_.isUndefined(touched) && _.isUndefined(errors)) ? null : touched["city"] && errors["city"] ? (
                                        <div className="error-message">{errors["city"] }</div>
                                    ): null}
                                </Form.Group>
                            </Row>
                            <Row className="mb-3" >
                                <Form.Group as={Col}>
                                    <Form.Label>Postcode</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="postCode"
                                        placeholder="Enter postcode"
                                        // onBlur={(e)=>{
                                        //     handleBlur(e)
                                        //     return updateCurrentRowItemFormState(e,e.target.value);
                                        // }}
                                        // disabled={disable}
                                        onChange={handleChange}
                                        className={(_.isUndefined(touched) && _.isUndefined(errors)) ? null : touched["postCode"] && errors["postCode"] ? "error" : null}
                                    />
                                    {(_.isUndefined(touched) && _.isUndefined(errors)) ? null : touched["postCode"] && errors["postCode"] ? (
                                        <div className="error-message">{errors["postCode"] }</div>
                                    ): null}
                                </Form.Group>
                            </Row>
                            <Row className="mb-3" >
                                <Form.Group>
                                    <Row>
                                        <Col md={3}>
                                            <Button variant="secondary" onClick={toggleModal}>
                                                Close
                                            </Button>
                                        </Col>
                                        <Col md={3}>
                                            <Button variant="primary" type="submit" disabled={isSubmitting}> Submit</Button>
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Row>
                        </Form>
                    )}
                </Formik>
                <ToastContainer
                    containerId="toast-container"
                    position="bottom-left"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        </>
    )
}

export default ExpenseAddressForm;


