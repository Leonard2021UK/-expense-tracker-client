import React, {useEffect, useState} from "react";
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
import {mainCategoryThunk,mainCategoryInValidate} from "../../../redux/features/suggestions/mainCategorySuggestionSlice"
import {expenseTrackerThunk,expenseTrackersInValidate} from "../../../redux/features/domain/expenseTrackerSlice";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import './expenseTrackerFormStyle.css';
import AutoSuggestion from "../../AutoSuggestion/AutoSuggestion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderPlus} from "@fortawesome/free-solid-svg-icons";
import {useApiService} from "../../../services/useApiService";
import {setExpenseTrackerCategory,setExpenseTrackerName,clearExpenseTrackerForm} from "../../../redux/features/domain/forms/expenseTrackerFormSlice";
import {useResponse} from "../../../customHooks/useResponse";

const ExpenseTrackerForm = (props) =>{

    const categoryMinLength = 3;
    let nonExistingOptionIsValid = false;
    const {disable,mainCategories,toggleModal} = props;
    const [nonExistingOption,setNonExistingOption] = useState('');
    const [savedNewMainCategory,setSavedNewMainCategory] = useState([]);
    const [fetchingNewCategory,setFetchingNewCategory] = useState(false);
    const [fetchingNewExpenseTracker,setFetchingNewExpenseTracker] = useState(false);
    const [handleNewMainCategoryResponse] = useResponse(setSavedNewMainCategory);
    const [handleNewExpenseTrackerResponse] = useResponse();


    //declared separately to be able to use to validate creation button
    const {fetchMainCategory,saveExpenseTracker} = useApiService();
    const dispatch = useDispatch();
    const rExpenseTrackerForm = useSelector((state) => state.expenseTrackerForm.formState)

    useEffect(()=>{
        dispatch(setExpenseTrackerCategory({"mainCategory":savedNewMainCategory}))

    },[savedNewMainCategory])
    const handleCreateNewCategory = ()=>{
        const reqBody = {
            "name":nonExistingOption
        }
        setFetchingNewCategory(true);

        fetchMainCategory("POST",reqBody)
            .then(async (response)=>{
                if(response.ok){
                    handleNewMainCategoryResponse(response, "New category was successfully created!")
                    // setSavedNewMainCategory( [parsedResponse]);
                    dispatch(mainCategoryInValidate({data:true}));
                    dispatch(mainCategoryThunk());

                }else {
                    handleNewMainCategoryResponse(response, null,"New category couldn't be created!")
                }
                setFetchingNewCategory(false);

            })
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(3,"Name must be at least 3 characters")
            .max(50, "Name must be less than 50 characters")
            .required("Name is required"),
        mainCategory: Yup.string()
            .min(categoryMinLength,"Category must be at least " + categoryMinLength + " characters")
            .max(50, "Category must be less than 50 characters")
            .required("Category doesn't exists! Change or create as new!"),
    });

    useEffect(()=>{
        //TODO check lodash is necessary
        if(!_.isEmpty(nonExistingOption) && nonExistingOption.length >= categoryMinLength ){
            nonExistingOptionIsValid = true;
        }
    })



    return (
        <>
            <div style={{width:"80%",margin:"auto"}}>
                <Formik
                    initialValues={{name:"", category:""}}
                    validationSchema={validationSchema}
                    onSubmit={(values, {setSubmitting, resetForm}) => {
                        // When button submits form and form is in the process of submitting, submit button is disabled
                        // setSubmitting(true);

                        console.log(rExpenseTrackerForm);
                        const reqBody = {
                            "name":rExpenseTrackerForm.mainCategoryName,
                            "mainCategory":rExpenseTrackerForm.mainCategory
                        }
                        // setFetchingNewExpenseTracker(true);
                        saveExpenseTracker(reqBody)
                            .then(async (response)=>{
                                if(response.ok){
                                    toggleModal();
                                    handleNewExpenseTrackerResponse(response, "New expense-tracker was successfully created!")
                                    // let parsedResponse = await response.json();
                                    // setSavedNewMainCategory( [parsedResponse]);
                                    dispatch(expenseTrackersInValidate({data:true}));

                                    dispatch(expenseTrackerThunk());
                                }else{
                                    toggleModal();
                                    handleNewExpenseTrackerResponse(response, null,"New expense-tracker couldn't be created!")

                                }
                                //TODO error handling
                            }).then(()=>{
                            dispatch(clearExpenseTrackerForm());
                            setFetchingNewExpenseTracker(false);

                        })
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
                                        onBlur={(e,event)=>{
                                            setFieldValue('name', e.target.value);
                                            dispatch(setExpenseTrackerName({mainCategoryName:values.name}))
                                            return  handleChange("name")
                                        }}
                                        value={values.name}
                                        disabled={disable}
                                        className={touched.name && errors.name ? "error" : null}
                                    />
                                    {touched.name && errors.name ? (
                                        <div className="error-message">{errors.name}</div>
                                    ): null}
                                </Form.Group>
                            </Row>
                            <Row className={"category-align"} style={{marginTop:5 + "vh"}}>
                                {/*<Form.Group>*/}
                                {/*    <InputGroup className="mb-5">*/}
                                <Form.Label>Category</Form.Label>
                                        <Col lg={8}>
                                            <AutoSuggestion
                                                id="main-category"
                                                suggestionName="mainCategory"
                                                reduxReducer={setExpenseTrackerCategory}
                                                initialValue={savedNewMainCategory}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                setFieldValue={setFieldValue}
                                                setFieldTouched={setFieldTouched}
                                                options={mainCategories}
                                                setNonExistingOption={setNonExistingOption}
                                                nonExistingOptionIsValid ={nonExistingOptionIsValid}
                                                suggestionLabels={["name"]}
                                                className={touched.category && errors.category ? "error" : null}
                                            />

                                            {touched.category && errors.category ? (
                                                <div className="error-message ">{errors.category}</div>
                                            ): null}
                                        </Col>

                                        <Col lg={2}>
                                            {/*<Button*/}
                                            {/*    variant="outline-secondary"*/}
                                            {/*    id="button-addon2"*/}
                                            {/*    className={"input-addon-button"}*/}
                                            {/*    onClick={handleCreateNewCategory}*/}
                                            {/*    disabled={ nonExistingOption === '' || nonExistingOption.length < categoryMinLength}*/}
                                            {/*>*/}
                                                <FontAwesomeIcon
                                                    icon={faFolderPlus}
                                                    className={(nonExistingOption === '' || nonExistingOption.length < categoryMinLength)?"fas fa-2x fa-disabled":"fas fa-2x" }
                                                    color={"green"}
                                                    style={{margin:1+"vh",cursor:"pointer"}}
                                                    onClick={handleCreateNewCategory}
                                                />
                                            {/*</Button>*/}
                                        </Col>
                                <Col lg={2} className={(fetchingNewCategory)?'show-spinner':"hide-spinner"}>
                                    <Spinner animation="border" size="sm" />

                                </Col>

                                    {/*</InputGroup>*/}
                                {/*</Form.Group>*/}
                            </Row>
                            <Row style={{marginTop:5 + "vh"}}>
                                <Col lg={3}>
                                    {/*<Form.Group>*/}
                                    {/*    <Row style={{marginTop:5 + "vh"}}>*/}
                                            <Col sm={1}>
                                                <Button variant="primary" type="submit" disabled={isSubmitting}>Create</Button>
                                            </Col>
                                        {/*</Row>*/}

                                    {/*</Form.Group>*/}
                                </Col>
                                <Col lg={3} className={(fetchingNewExpenseTracker)?'':"hide-spinner"}>
                                    <Spinner animation="border" size="sm" />

                                </Col>
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

export default ExpenseTrackerForm;


