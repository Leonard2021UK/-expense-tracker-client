import React, {useEffect, useRef, useState} from "react";
import {
    Button,
    Col,
    Form,
    Row,
    Spinner,
    ToastContainer
} from "react-bootstrap";
import {Formik} from "formik";
import * as Yup from 'yup';
import {itemCategoryThunk,itemCategoryInValidate} from "../../../redux/features/suggestions/itemCategorySuggestionSlice";
import {unitTypeThunk,unitTypeInValidate} from "../../../redux/features/suggestions/unitSuggestionSlice";
import {useDispatch} from "react-redux";
import _ from "lodash";
import './itemFormStyle.css';
import AutoSuggestion from "../../AutoSuggestion/AutoSuggestion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderPlus} from "@fortawesome/free-solid-svg-icons";
import {useApiService} from "../../../services/useApiService";
import {
    setItemCategory,
    setItem, setUnitType
} from "../../../redux/features/domain/forms/itemFormSlice";
import {useResponse} from "../../../customHooks/useResponse";
import {itemThunk} from "../../../redux/features/suggestions/itemSuggestionSlice";
import {
    addRow,
    setRowId,
} from "../../../redux/features/domain/forms/expenseFormSlice";
import {itemInValidate} from "../../../redux/features/suggestions/itemSuggestionSlice";

const ItemForm = (props) =>{


    const dispatch = useDispatch();

    const preventFirstRenderRef = useRef({"item":false,"itemCategory":false,"unitType":false});

    const itemCategoryMinLength = 3;
    const unitMinLength = 3;
    const itemMinLength = 3;

    let nonExistingItemCategoryOptionIsValid = false;
    let typedOptionItemCategoryAlreadyExists = false;

    let nonExistingUnitOptionIsValid = false;
    let typedOptionUnitAlreadyExists = false;

    let nonExistingItemOptionIsValid = false;
    let typedOptionItemAlreadyExists = false;

    const {disable,rItemTableData,toggleModal,rItemCategories,rUnitTypes,rItem} = props;

    const [newRowData,setNewRowData] = useState({});

    const [nonExistingUnitOption,setNonExistingUnitOption] = useState('');
    const [nonExistingItemCategoryOption,setNonExistingItemCategoryOption] = useState('');
    const [nonExistingItemOption,setNonExistingItemOption] = useState('');

    const [savedNewItemCategory,setSavedNewCategory] = useState([]);
    const [savedNewUnit,setSavedNewUnit] = useState([]);
    const [savedNewItem,setSavedNewItem] = useState([]);

    const [fetchingNewItemCategory,setFetchingNewItemCategory] = useState(false);
    const [fetchingNewUnit,setFetchingNewUnit] = useState(false);
    const [fetchingNewItem,setFetchingNewItem] = useState(false);

    const [handleNewItemCategoryResponse] = useResponse(setSavedNewCategory);
    const [handleNewUnitResponse] = useResponse(setSavedNewUnit);
    const [handleNewItemResponse] = useResponse(setSavedNewItem);

    const {itemApiModule,unitTypeApiModule,itemCategoryApiModule} = useApiService();

    useEffect(()=>{

        if (preventFirstRenderRef.current.itemCategory){
            dispatch(setItemCategory({"itemCategory":savedNewItemCategory}))
            setNewRowData(prevState => ({...prevState,"itemCategory":savedNewItemCategory}))
        }
        preventFirstRenderRef.current["itemCategory"] = true;

    },[savedNewItemCategory])

    useEffect(()=>{

        if (preventFirstRenderRef.current.item){
            dispatch(setItem({"item":savedNewItem}))
            setNewRowData(prevState => ({...prevState,"item":savedNewItem}))
        }
        preventFirstRenderRef.current["item"] = true;

    },[savedNewItem])

    useEffect(()=>{

        if (preventFirstRenderRef.current.unitType){
            dispatch(setUnitType({"unitType":savedNewUnit}))
            setNewRowData(prevState => ({...prevState,"unitType":savedNewUnit}))
        }
        preventFirstRenderRef.current["unitType"] = true;

    },[savedNewUnit])



    // if item is used as a table row initialize rowId
    useEffect(() => {
        if (!_.isUndefined(rItemTableData)) {
        }
    },[rItemTableData.expenseItems])
    //
    const handleCreateNewCategory = ()=>{

        if(nonExistingItemCategoryOption && !typedOptionItemCategoryAlreadyExists){

            const reqBody = {
                "name":nonExistingItemCategoryOption
            }
            setFetchingNewItemCategory(true);

            itemCategoryApiModule().saveItemCategory(reqBody)
                .then(async (response)=>{
                    if(response.ok){
                        // updates the new row data
                        handleNewItemCategoryResponse(response, "New category was successfully created!")
                        // setSavedNewMainCategory( [parsedResponse]);
                        dispatch(itemCategoryInValidate({data:true}));
                        dispatch(itemCategoryThunk());

                    }else {
                        handleNewItemCategoryResponse(response, null,"New category couldn't be created!")
                    }
                    setFetchingNewItemCategory(false);

                }).then(()=>{
                    // updates the new row data
                    // setNewRowData(prevState => ({...prevState,"itemCategory":savedNewItemCategory}))
            })
        }
    }
    //
    const handleCreateNewUnit = ()=>{

        if(nonExistingUnitOptionIsValid && !typedOptionUnitAlreadyExists) {
            const reqBody = {
                "name": nonExistingUnitOption
            }
            setFetchingNewUnit(true);

            unitTypeApiModule().saveUnitType("POST", reqBody)
                .then(async (response) => {
                    if (response.ok) {
                        // updates the new row data
                        handleNewUnitResponse(response, "New unit type was successfully created!")
                        // setSavedNewMainCategory( [parsedResponse]);
                        dispatch(unitTypeInValidate({data: true}));
                        dispatch(unitTypeThunk());

                    } else {
                        handleNewUnitResponse(response, null, "New unit type couldn't be created!")
                    }
                    setFetchingNewUnit(false);

                }).then(()=>{
                    // updates the new row data
                    // setNewRowData(prevState => ({...prevState,"unitType":setSavedNewUnit}))
            })
        }
    }

    const handleCreateNewItem = ()=>{
        if(nonExistingItemOption && !typedOptionItemAlreadyExists) {

            const reqBody = {
                "name": nonExistingItemOption
            }
            setFetchingNewItem(true);

            itemApiModule().saveItem(reqBody)
                .then(async (response) => {
                    if (response.ok) {
                        handleNewItemResponse(response, "New item was successfully created!")
                        // setSavedNewMainCategory( [parsedResponse]);
                        dispatch(itemInValidate({data: true}));
                        dispatch(itemThunk());

                    } else {
                        handleNewItemResponse(response, null, "New item couldn't be created!")
                    }

                    setFetchingNewItem(false);
                }).then(()=>{
                    // updates the new row data
                    // setNewRowData(prevState => ({...prevState,"item":savedNewItem}))
            })
        }
    }
    //
    const validationSchema = Yup.object().shape({
        item: Yup.string()
            .min(itemMinLength,"Name must be at least " + itemMinLength + " characters")
            .max(50, "Name must be less than 50 characters")
            .required("Name is required!"),
        amount: Yup.number()
            .positive("Must be more than zero")
            .required("Amount is required!"),
        unitPrice: Yup.number()
            .positive("Must be more than zero"),
            // .required("Unit price is required!"),
        itemCategory: Yup.string()
            .min(itemCategoryMinLength,"Category must be at least " + itemCategoryMinLength + " character")
            .max(50, "Category must be less than 50 characters")
            .required("Category is required!"),
        unitType: Yup.string()
            .required("Unit is required!"),
        price: Yup.number()
            .positive("Must be more than zero")
            .required("Price is required!"),
    });
    //
    useEffect(()=>{
        //TODO check lodash is necessary
        // if(!_.isEmpty(nonExistingItemCategoryOption) && nonExistingItemCategoryOption.length >= itemCategoryMinLength ){
        //     nonExistingItemCategoryOptionIsValid = true;
        // }
        // if(!_.isEmpty(nonExistingUnitOption) && nonExistingUnitOption.length >= unitMinLength ){
        //     nonExistingUnitOptionIsValid = true;
        // }
        // if(!_.isEmpty(nonExistingItemOption) && nonExistingItemOption.length >= itemMinLength ){
        //     nonExistingItemOptionIsValid = true;
        // }

    })

    useEffect(()=>{
        // if the typed category name already exists then disable create icon
        let result = [];
        result = rItemCategories.filter((option) => option.name === nonExistingItemCategoryOption )
        typedOptionItemCategoryAlreadyExists = result.length > 0;

        if(!_.isEmpty(nonExistingItemCategoryOption) && nonExistingItemCategoryOption.length >= itemCategoryMinLength ){
            nonExistingItemCategoryOptionIsValid = true;
        }
    },[nonExistingItemCategoryOption])

    useEffect(()=>{
        // if the typed unitType name already exists then disable create icon
        let result = [];
        result = rUnitTypes.filter((option) => option.name === nonExistingUnitOptionIsValid )
        typedOptionUnitAlreadyExists = result.length > 0;

        if(!_.isEmpty(nonExistingUnitOption) && nonExistingUnitOption.length >= unitMinLength ){
            nonExistingUnitOptionIsValid = true;
        }
    },[nonExistingUnitOption])

    useEffect(()=>{
        // if the typed item name already exists then disable create icon
        let result = [];
        result = rItem.filter((option) => option.name === nonExistingItemOption )
        typedOptionItemAlreadyExists = result.length > 0;

        if(!_.isEmpty(nonExistingItemOption) && nonExistingItemOption.length >= itemMinLength ){
            nonExistingItemOptionIsValid = true;
        }
    },[nonExistingItemOption])
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
    const updateCurrentRowItemFormState = (event,value) => {
        const name = event.target.name;
        switch(name){
            case("item"):
                // dispatch(setItem({"item":value}));
                setNewRowData(prevState => ({...prevState,[name]:value}))
                break;
            case("itemCategory"):
                // dispatch(setItemCategory({"itemCategory":value}))
                setNewRowData(prevState => ({...prevState,[name]:value}))
                break;
            case("unitType"):
                // dispatch(setUnitType({"unitType":value}));
                setNewRowData(prevState => ({...prevState,[name]:value}))
                break;
            case("amount"):
                // dispatch(setAmount({"amount":value}));
                setNewRowData(prevState => ({...prevState,[name]:value}))
                break;
            case("unitPrice"):
                // dispatch(setUnitPrice({"unitPrice":value}));
                setNewRowData(prevState => ({...prevState,[name]:value}))
                break;
            case("price"):
                // dispatch(setPrice({"price":value}));
                setNewRowData(prevState => ({...prevState,[name]:value}))
                break;
        }
    }
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
                        item:"",
                        itemCategory:"",
                        amount:"",
                        price:"",
                        unitType:"",
                        unitPrice:""
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, {setSubmitting, resetForm}) => {
                        // When button submits form and form is in the process of submitting, submit button is disabled
                        setSubmitting(true);

                        // dispatch(setRowId({"rowId": rItemTableData.length}))
                        dispatch(setRowId({"rowId": rItemTableData.length}))

                        dispatch(addRow({
                            row:newRowData,rowId:rItemTableData.length
                        }))
                        setSubmitting(false);
                        toggleModal()
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
                            <Row className="category-align">
                                <Form.Group as={Col}>
                                    <Form.Label>Name</Form.Label>
                                    <Col md={12} lg={12}>
                                        <AutoSuggestion
                                            newRowData={newRowData}
                                            disable={disable}
                                            suggestionName="item"
                                            setFieldValue={setFieldValue}
                                            setFieldTouched={setFieldTouched}
                                            updateCurrentRowItemFormState={updateCurrentRowItemFormState}
                                            options={rItem}
                                            setNonExistingOption={setNonExistingItemOption}
                                            nonExistingOptionIsValid ={nonExistingItemOptionIsValid}
                                            suggestionLabels={["name"]}
                                            errors={errors}
                                            touched={touched}
                                            savedNewRecord={savedNewItem}
                                        />
                                    </Col>
                                    <Col md={2} lg={2}>
                                        <FontAwesomeIcon
                                            icon={faFolderPlus}
                                            // className={(nonExistingItemOption === '' || nonExistingItemOption.length < itemMinLength)?"fas fa-2x fa-disabled":"fas fa-2x" }
                                            className={(nonExistingItemOptionIsValid && !typedOptionItemAlreadyExists) ? "fas fa-2x" : "fas fa-2x fa-disabled" }

                                            color={"green"}
                                            style={{margin:1+"vh",cursor:"pointer"}}
                                            onClick={handleCreateNewItem}
                                        />
                                    </Col>
                                    <Col md={2} lg={2} className={(fetchingNewItem)?'show-spinner':"hide-spinner"}>
                                        <Spinner animation="border" size="sm" />
                                    </Col>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3" >
                                <Form.Group as={Col}>
                                    <Form.Label>Amount</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="amount"
                                        placeholder="Enter amount"
                                        onBlur={(e)=>{
                                            // handleBlur(e)
                                            return updateCurrentRowItemFormState(e,e.target.value);
                                        }}
                                        disabled={disable}
                                        onChange={handleChange}
                                        className={(_.isUndefined(touched) && _.isUndefined(errors)) ? null : touched["amount"] && errors["amount"] ? "error" : null}
                                    />
                                    {(_.isUndefined(touched) && _.isUndefined(errors)) ? null : touched["amount"] && errors["amount"] ? (
                                        <div className="error-message">{errors["amount"] }</div>
                                    ): null}
                                </Form.Group>
                            </Row>
                            <Row className="mb-3" >
                                <Form.Group as={Col} >
                                    <Form.Label>Unit</Form.Label>
                                    <Col lg={12}>
                                        <AutoSuggestion
                                            disable={disable}
                                            suggestionName="unitType"
                                            setFieldValue={setFieldValue}
                                            setFieldTouched={setFieldTouched}
                                            updateCurrentRowItemFormState={updateCurrentRowItemFormState}
                                            options={rUnitTypes}
                                            setNonExistingOption={setNonExistingUnitOption}
                                            nonExistingOptionIsValid ={nonExistingUnitOptionIsValid}
                                            suggestionLabels={["name"]}
                                            errors={errors}
                                            touched={touched}
                                            reduxForm={rUnitTypes}
                                            savedNewRecord={savedNewUnit}
                                        />
                                    </Col>
                                    <Col lg={2}>
                                        <FontAwesomeIcon
                                            icon={faFolderPlus}
                                            // className={(nonExistingUnitOption === '' || nonExistingUnitOption.length < unitMinLength)?"fas fa-2x fa-disabled":"fas fa-2x" }
                                            className={(nonExistingUnitOptionIsValid && !typedOptionUnitAlreadyExists) ? "fas fa-2x" : "fas fa-2x fa-disabled" }
                                            color={"green"}
                                            style={{margin:1+"vh",cursor:"pointer"}}
                                            onClick={handleCreateNewUnit}
                                        />
                                    </Col>
                                    <Col lg={2} className={(fetchingNewUnit)?'show-spinner':"hide-spinner"}>
                                        <Spinner animation="border" size="sm" />
                                    </Col>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3" >
                                <Form.Group as={Col}>
                                    <Form.Label>Unit price</Form.Label>
                                    <Form.Control
                                        type={"number"}
                                        name={"unitPrice"}
                                        placeholder={"Enter unit price"}
                                        onBlur={(e)=>{
                                            handleBlur(e)
                                            return updateCurrentRowItemFormState(e,e.target.value);
                                        }}
                                        disabled={disable}
                                        onChange={handleChange}
                                        className={(_.isUndefined(touched) && _.isUndefined(errors)) ? null : touched["unitPrice"] && errors["unitPrice"] ? "error" : null}
                                    />
                                    {(_.isUndefined(touched) && _.isUndefined(errors)) ? null : touched["unitPrice"] && errors["unitPrice"] ? (
                                        <div className="error-message">{errors["unitPrice"] }</div>
                                    ): null}
                                </Form.Group>
                            </Row>
                            <Row className="mb-3" >
                                <Form.Group as={Col}>
                                <Form.Label>Category</Form.Label>
                                    <Col lg={12}>
                                        <AutoSuggestion
                                            disable={disable}
                                            setFieldValue={setFieldValue}
                                            setFieldTouched={setFieldTouched}
                                            updateCurrentRowItemFormState={updateCurrentRowItemFormState}
                                            suggestionName="itemCategory"
                                            options={rItemCategories}
                                            setNonExistingOption={setNonExistingItemCategoryOption}
                                            nonExistingOptionIsValid ={nonExistingItemCategoryOptionIsValid}
                                            suggestionLabels={["name"]}
                                            errors={errors}
                                            touched={touched}
                                            savedNewRecord={savedNewItemCategory}
                                        />
                                    </Col>

                                    <Col lg={2}>
                                        <FontAwesomeIcon
                                            icon={faFolderPlus}
                                            // className={(nonExistingItemCategoryOption === '' || nonExistingItemCategoryOption.length < itemCategoryMinLength)?"fas fa-2x fa-disabled":"fas fa-2x" }
                                            className={(nonExistingItemCategoryOptionIsValid && !typedOptionItemCategoryAlreadyExists) ? "fas fa-2x" : "fas fa-2x fa-disabled" }
                                            color={"green"}
                                            style={{margin:1+"vh",cursor:"pointer"}}
                                            onClick={handleCreateNewCategory}
                                        />
                                    </Col>
                                    <Col lg={2} className={(fetchingNewItemCategory)?'show-spinner':"hide-spinner"}>
                                        <Spinner animation="border" size="sm" />
                                    </Col>
                                </Form.Group>
                            </Row>
                            <Row className={"category-align"} >
                                <Form.Group as={Col}>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type={"number"}
                                        name={"price"}
                                        placeholder={"Enter price"}
                                        onBlur={(e)=>{
                                            handleBlur(e)
                                            return updateCurrentRowItemFormState(e,e.target.value);
                                        }}
                                        disabled={disable}
                                        onChange={handleChange}
                                        className={(_.isUndefined(touched) && _.isUndefined(errors)) ? null : touched["price"] && errors["price"] ? "error" : null}
                                    />
                                    {(_.isUndefined(touched) && _.isUndefined(errors)) ? null : touched["price"] && errors["price"] ? (
                                        <div className="error-message">{errors["price"] }</div>
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
                                            <Button variant="primary" type="submit" disabled={isSubmitting}> Register</Button>
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
                    closeOnClick={true}
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable={false}
                    pauseOnHover={true}
                />
            </div>
        </>
    )
}

export default ItemForm;


