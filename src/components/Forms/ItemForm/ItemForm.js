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
import {itemCategoryThunk,itemCategoryInValidate} from "../../../redux/features/suggestions/itemCategorySuggestionSlice";
import {unitTypeThunk,unitTypeInValidate} from "../../../redux/features/suggestions/unitSuggestionSlice";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import './itemFormStyle.css';
import AutoSuggestion from "../../AutoSuggestion/AutoSuggestion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderPlus} from "@fortawesome/free-solid-svg-icons";
import {useApiService} from "../../../services/useApiService";
import {setItemCategory, setItemName, setUnit} from "../../../redux/features/domain/itemFormSlice";
import {useResponse} from "../../../customHooks/useResponse";

const ItemForm = (props) =>{

    const categoryMinLength = 3;
    const unitMinLength = 3;

    let nonExistingCategoryOptionIsValid = false;
    let nonExistingUnitOptionIsValid = false;

    const {disable,itemCategories,unitTypes,toggleModal} = props;

    const [nonExistingUnitOption,setNonExistingUnitOption] = useState('');
    const [nonExistingCategoryOption,setNonExistingCategoryOption] = useState('');

    const [savedNewCategory,setSavedNewCategory] = useState([]);
    const [savedNewUnit,setSavedNewUnit] = useState([]);

    const [fetchingNewCategory,setFetchingNewCategory] = useState(false);
    const [fetchingNewUnit,setFetchingNewUnit] = useState(false);


    const [fetchingNewItem,setFetchingNewItem] = useState(false);

    const [handleNewCategoryResponse] = useResponse(setSavedNewCategory);
    const [handleNewUnitResponse] = useResponse(setSavedNewUnit);

    const [handleNewItemResponse] = useResponse();


    const {getAllItemCategories,getAllUnitTypes,saveItem} = useApiService();

    const dispatch = useDispatch();
    const rItemForm = useSelector((state) => state.itemForm.formState)

    useEffect(()=>{
        dispatch(setItemCategory({"itemCategory":savedNewCategory}))

        dispatch(setUnit({"unit":savedNewUnit}))

    },[savedNewCategory,savedNewUnit])

    const handleCreateNewCategory = ()=>{
        const reqBody = {
            "name":nonExistingCategoryOption
        }
        setFetchingNewCategory(true);

        getAllItemCategories("POST",reqBody)
            .then(async (response)=>{
                if(response.ok){
                    handleNewCategoryResponse(response, "New category was successfully created!")
                    // setSavedNewMainCategory( [parsedResponse]);
                    dispatch(itemCategoryInValidate({data:true}));
                    dispatch(itemCategoryThunk());

                }else {
                    handleNewCategoryResponse(response, null,"New category couldn't be created!")
                }
                setFetchingNewCategory(false);

            })
    }

    const handleCreateNewUnit = ()=>{
        const reqBody = {
            "name":nonExistingUnitOption
        }
        setFetchingNewUnit(true);

        getAllUnitTypes("POST",reqBody)
            .then(async (response)=>{
                if(response.ok){
                    handleNewUnitResponse(response, "New unit type was successfully created!")
                    // setSavedNewMainCategory( [parsedResponse]);
                    dispatch(unitTypeInValidate({data:true}));
                    dispatch(unitTypeThunk());

                }else {
                    handleNewCategoryResponse(response, null,"New unit type couldn't be created!")
                }
                setFetchingNewUnit(false);

            })
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(3,"Name must be at least 3 characters")
            .max(50, "Name must be less than 50 characters")
            .required("Name is required!"),
        amount: Yup.number()
            .min(1,"Amount must be at least 1 character")
            .max(10, "Amount must be less than 10 characters")
            .required("Amount is required!"),
        unitPrice: Yup.number()
            .min(1,"Unit price must be at least 1 character")
            .max(10, "Unit price must be less than 10 characters")
            .required("Unit price is required!"),
        category: Yup.string()
            .min(categoryMinLength,"Category must be at least " + categoryMinLength + " character")
            .max(50, "Category must be less than 50 characters")
            .required("Category doesn't exists! Change or create as new!"),
        unit: Yup.string()
            .min(unitMinLength,"Unit must be at least " + unitMinLength + " character")
            .max(50, "Unit must be less than 50 characters")
            .required("Unit doesn't exists! Change or create as new!"),
    });

    useEffect(()=>{
        //TODO check lodash is necessary
        if(!_.isEmpty(nonExistingCategoryOption) && nonExistingCategoryOption.length >= categoryMinLength ){
            nonExistingCategoryOptionIsValid = true;
        }
        if(!_.isEmpty(nonExistingUnitOption) && nonExistingUnitOption.length >= unitMinLength ){
            nonExistingCategoryOptionIsValid = true;
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
                        setSubmitting(true);
                        console.log(rItemForm)


                        // alert("SUBMITTING")
                        const reqBody = {
                            "name":rItemForm.itemName,
                            "amount":rItemForm.amount,
                            "unitPrice":rItemForm.unitPrice,
                            "unitType":rItemForm.unitType[0].id
                            "mainCategoryId":rItemForm.itemCategory[0].id
                        }
                        setFetchingNewItem(true);
                        saveItem(reqBody)
                            .then(async (response)=>{
                                console.log(response)
                                if(response.ok){
                                    toggleModal();
                                    handleNewItemResponse(response, "New eitem was successfully created!")
                                    // let parsedResponse = await response.json();
                                    // setSavedNewMainCategory( [parsedResponse]);
                                    dispatch(itemCategoryInValidate({data:true}));
                                    dispatch(item());
                                }else{
                                    toggleModal();
                                    handleNewExpenseTrackerResponse(response, null,"New expense-tracker couldn't be created!")

                                }
                                //TODO error handling
                            }).then(()=>{
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
                                        onChange={(e,event)=>{
                                            console.log(e.target.value);
                                            setFieldValue('name', e.target.value);
                                            dispatch(setItemName({itemName:values.name}))
                                            return  handleChange("name")
                                        }}
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
                            <Row className={"category-align"} style={{marginTop:5 + "vh"}}>
                                {/*<Form.Group>*/}
                                {/*    <InputGroup className="mb-5">*/}
                                <Form.Label>Category</Form.Label>
                                <Col lg={8}>
                                    <AutoSuggestion
                                        id="unit-type"
                                        suggestionName="unitType"
                                        reduxReducer={setUnit}
                                        initialValue={savedNewUnit}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        setFieldValue={setFieldValue}
                                        setFieldTouched={setFieldTouched}
                                        options={unitTypes}
                                        setNonExistingOption={setNonExistingUnitOption}
                                        nonExistingCategoryOptionIsValid ={nonExistingUnitOptionIsValid}
                                        suggestionLabels={["name"]}
                                        className={touched.unit && errors.unit ? "error" : null}
                                    />


                                    {touched.unit && errors.unit ? (
                                        <div className="error-message ">{errors.unit}</div>
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
                                        className={(nonExistingUnitOption === '' || nonExistingUnitOption.length < unitMinLength)?"fas fa-2x fa-disabled":"fas fa-2x" }
                                        color={"green"}
                                        style={{margin:1+"vh",cursor:"pointer"}}
                                        onClick={handleCreateNewUnit}
                                    />
                                    {/*</Button>*/}
                                </Col>
                                <Col lg={2} className={(fetchingNewUnit)?'show-spinner':"hide-spinner"}>
                                    <Spinner animation="border" size="sm" />

                                </Col>

                                {/*</InputGroup>*/}
                                {/*</Form.Group>*/}
                            </Row>
                            <Row className={"category-align"} style={{marginTop:5 + "vh"}}>
                                {/*<Form.Group>*/}
                                {/*    <InputGroup className="mb-5">*/}
                                <Form.Label>Category</Form.Label>
                                        <Col lg={8}>
                                            <AutoSuggestion
                                                id="item-category"
                                                suggestionName="itemCategory"
                                                reduxReducer={setItemCategory()}
                                                initialValue={savedNewCategory}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                setFieldValue={setFieldValue}
                                                setFieldTouched={setFieldTouched}
                                                options={itemCategories}
                                                setNonExistingOption={setNonExistingCategoryOption}
                                                nonExistingCategoryOptionIsValid ={nonExistingCategoryOptionIsValid}
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
                                                    className={(nonExistingCategoryOption === '' || nonExistingCategoryOption.length < categoryMinLength)?"fas fa-2x fa-disabled":"fas fa-2x" }
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

export default ItemForm;


