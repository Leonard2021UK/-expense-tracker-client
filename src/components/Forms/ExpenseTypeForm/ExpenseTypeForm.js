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
import './expenseTypeFormStyle.css';
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
import {expenseTypeInValidate, expenseTypeThunk} from "../../../redux/features/suggestions/expenseTypeSuggestionSlice";

const ExpenseTypeForm = (props) =>{


    const dispatch = useDispatch();

    const nameMinLength = 3;

    const {toggleModal} = props;

    const [fetchingNewExpenseType,setFetchingNewExpenseType] = useState(false);
    const [savedNewExpenseType,setSavedNewExpenseType] = useState({});

    const [handleNewExpenseTypeResponse] = useResponse(setSavedNewExpenseType);

    const {saveExpenseType} = useApiService();

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(nameMinLength,"Name must be at least " + nameMinLength + " characters")
            .max(50, "Name must be less than 50 characters")
            .required("Name is required!"),
    });

    return (
        <>
            <div style={{width:"80%",margin:"auto"}}>
                <Formik
                    initialValues={{
                        name:""
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, {setSubmitting, resetForm}) => {
                        // When button submits form and form is in the process of submitting, submit button is disabled
                        setSubmitting(true);
                        setFetchingNewExpenseType(true);
                        saveExpenseType("POST",values)
                            .then(async (response)=>{
                                if(response.ok){
                                    toggleModal();
                                    handleNewExpenseTypeResponse(response, "New item was successfully created!")
                                    // let parsedResponse = await response.json();
                                    // setSavedNewMainCategory( [parsedResponse]);
                                    dispatch(expenseTypeInValidate({data:true}));
                                    dispatch(expenseTypeThunk());
                                }else{
                                    toggleModal();
                                    handleNewExpenseTypeResponse(response, null,"New item couldn't be created!")

                                }
                        //         //TODO error handling
                            }).then(()=>{
                            setFetchingNewExpenseType(false);
                        //
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
                            <Row className={"category-align"}>
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
                                <Form.Group>
                                    <Row>
                                        <Col md={3}>
                                            <Button variant="secondary" onClick={toggleModal}>
                                                Close
                                            </Button>
                                        </Col>
                                        <Col md={3}>
                                            <Button variant="primary" type="submit" disabled={isSubmitting}> Submit </Button>
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

export default ExpenseTypeForm;


