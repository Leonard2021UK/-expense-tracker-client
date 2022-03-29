import React, {useEffect, useState} from "react";
import {Accordion, Button, Col, FloatingLabel, Form, FormControl,Row} from "react-bootstrap";
import exact from "prop-types-exact";
import PropTypes from "prop-types";
import "./expenseFormStyle.css";
import {Formik} from "formik";
import * as Yup from 'yup';
import _ from "lodash";
import ItemsTable from "../../ItemsTable/ItemsTable";
import TableToolBar from "../../TableToolBars/TableToolBar";
import CreateItemModal from "../../Modals/CreateItemModal/CreateItemModal";
import {clearItemForm} from "../../../redux/features/domain/forms/itemFormSlice";
import {useResponse} from "../../../customHooks/useResponse";
import {useApiService} from "../../../services/useApiService";
import {useDispatch, useSelector} from "react-redux";
import {unitTypeThunk} from "../../../redux/features/suggestions/unitSuggestionSlice";
import {itemCategoryThunk} from "../../../redux/features/suggestions/itemCategorySuggestionSlice";
import {itemThunk} from "../../../redux/features/suggestions/itemSuggestionSlice";
import {expenseAddressThunk} from "../../../redux/features/suggestions/expenseAddressSuggestionSlice";
import {expensePaymentTypeThunk} from "../../../redux/features/suggestions/expensePaymentTypeSuggestionSlice";
import {expenseTypeThunk} from "../../../redux/features/suggestions/expenseTypeSuggestionSlice";
import {removeRow,removeSelectedRow,clearItemTableState} from "../../../redux/features/domain/forms/expenseFormSlice";
import {setOwnerExpenseTracker,setExpenseFormState, setExpenseName, setExpenseEmail, setExpensePhone, setExpenseMobile, setExpenseAddress, setExpensePaymentType, setExpenseType, setExpenseComment, clearExpenseForm} from "../../../redux/features/domain/forms/expenseFormSlice";
import {expenseTrackersInValidate, expenseTrackerThunk} from "../../../redux/features/domain/expenseTrackerSlice";
import AddNewResourceModal from "../../Modals/AddNewResourceModal/AddNewResourceModal";
import ExpenseAddressForm from "../ExpenseAddressForm/ExpenseAddressForm";
import ExpenseTypeForm from "../ExpenseTypeForm/ExpenseTypeForm";
import PaymentTypeForm from "../PaymentTypeForm/PaymentTypeForm";
import ItemForm from "../ItemForm/ItemForm";


const ExpenseForm = (props) =>{

    const {initialValue,ownerExpenseTracker,disable,toggleModal,update,setSelectedExpense} = props;

    const dispatch = useDispatch();

    const expenseNameMinLength = 3;

    let nonExistingItemCategoryOptionIsValid = false;
    let nonExistingUnitOptionIsValid = false;
    let nonExistingItemOptionIsValid = false;

    const [nonExistingUnitOption,setNonExistingUnitOption] = useState('');
    const [nonExistingCategoryOption,setNonExistingCategoryOption] = useState('');
    const [nonExistingItemOption,setNonExistingItemOption] = useState('');

    const [newRowData,setNewRowData] = useState({});

    const [fetchingExpense,setFetchingExpense] = useState(false);
    const [expenseTotalPrice,setExpenseTotalPrice] = useState(0);
    const [handleExpenseResponse] = useResponse();

    const [createExpenseAddressModalIsOpen,setCreateExpenseAddressModalIsOpen] = useState(false);
    const [createPaymentTypeModalIsOpen,setCreatePaymentTypeModalIsOpen] = useState(false);
    const [createExpenseTypeModalIsOpen,setCreateExpenseTypeModalIsOpen] = useState(false);
    const [createItemModalIsOpen,setCreateItemModalIsOpen] = useState(false);

    const {saveExpense} = useApiService();

    const rItemTableData = useSelector((state) => state.itemsTable)
    const rExpenseForm = useSelector((state) => state.expenseForm.formState);

    const rExpenseAddresses = useSelector((state) => state.suggestions.expenseAddress.response);
    const rExpensePaymentType= useSelector((state) => state.suggestions.expensePaymentType.response);
    const rExpenseType = useSelector((state) => state.suggestions.expenseType.response);

    const toggleCreateItemModal = ()=>{
        setCreateItemModalIsOpen(!createItemModalIsOpen);
        dispatch(clearItemForm())
    }
    const toggleCreateExpenseAddressModal = ()=>{
        setCreateExpenseAddressModalIsOpen(!createExpenseAddressModalIsOpen);
        dispatch(clearItemForm())
    }

    const toggleCreatePaymentTypeModalIsOpen = ()=>{
        setCreatePaymentTypeModalIsOpen(!createPaymentTypeModalIsOpen);
        dispatch(clearItemForm())
    }

    const toggleCreateExpenseTypeModalIsOpen = ()=>{
        setCreateExpenseTypeModalIsOpen(!createExpenseTypeModalIsOpen);
        dispatch(clearItemForm())
    }

    useEffect(()=>{
        dispatch(unitTypeThunk())
        dispatch(itemCategoryThunk())
        dispatch(itemThunk())
        dispatch(expenseTypeThunk())
        dispatch(expenseAddressThunk())
        dispatch(expensePaymentTypeThunk())

        // when ownerExpenseTracker is present and no initial value was provided then initialize the form owner with the ownerExpenseTracker data
        if( !_.isUndefined(initialValue) ){
            dispatch(setExpenseFormState({formState:initialValue}))
        }
        dispatch(setOwnerExpenseTracker({expenseTracker:ownerExpenseTracker}))

    },[])

    useEffect(()=>{
        getExpenseTotalPrice();
    })

    const addTableRow = ()=>{

        setCreateItemModalIsOpen(true)
    }

    const removeTableRow = ()=>{
        dispatch(removeRow())

    }

    const clearTable = () =>{
        dispatch(clearItemTableState())
    }

    const removeSelectedTableRow = (index)=>{
        let updatedItemTable = initialValue.expenseItems.filter((row)=> row.id.rowId !== index);
        let updatedInitialValue = {...initialValue,expenseItems : updatedItemTable}
        setSelectedExpense(updatedInitialValue)
        dispatch(removeSelectedRow({id:index}))
    }


    const handleFormFieldOnBlur = (e) => {
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
                if(value === "CREATE"){
                    toggleCreatePaymentTypeModalIsOpen();
                }else{
                    dispatch(setExpensePaymentType({[name]:value}))
                }
                break;
            case (name === "expenseType" ):
                if(value === "CREATE"){
                    toggleCreateExpenseTypeModalIsOpen();
                }else{
                    dispatch(setExpenseType({[name]:value}))
                }
                break;
            case (name === "expenseAddress" ):
                if(value === "CREATE"){
                    toggleCreateExpenseAddressModal();
                }else{
                    dispatch(setExpenseAddress({[name]:value}))
                }
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

    const getExpenseTotalPrice = ()=>{
        let sum;
        if(!rExpenseForm.expenseItems.length > 1){
            sum = rExpenseForm.expenseItems.reduce((previousValue, currentValue) =>{

                if(_.isUndefined(previousValue)){

                    return currentValue.price;
                }
                return previousValue.price + currentValue.price;
            })
            setExpenseTotalPrice(sum);
        }else {
            if(!_.isEmpty(rExpenseForm.expenseItems)){
                setExpenseTotalPrice(rExpenseForm.expenseItems[0].price)
            }
        }
    }

    return (
        <>
            <AddNewResourceModal show={createExpenseAddressModalIsOpen} toggleModal={toggleCreateExpenseAddressModal} title={"Add new address"}>
                {(toggleCreateExpenseAddressModal)=>(<ExpenseAddressForm toggleModal={toggleCreateExpenseAddressModal}/>)}
            </AddNewResourceModal>
            <AddNewResourceModal show={createExpenseTypeModalIsOpen} toggleModal={toggleCreateExpenseTypeModalIsOpen} title={"Add new expense type"}>
                {(toggleCreateExpenseTypeModalIsOpen)=>(<ExpenseTypeForm toggleModal={toggleCreateExpenseTypeModalIsOpen}/>)}
            </AddNewResourceModal>
            <AddNewResourceModal show={createPaymentTypeModalIsOpen} toggleModal={toggleCreatePaymentTypeModalIsOpen} title={"Add new payment type"}>
                {(toggleCreatePaymentTypeModalIsOpen)=>(<PaymentTypeForm toggleModal={toggleCreatePaymentTypeModalIsOpen}/>)}
            </AddNewResourceModal>
            {/*<AddNewResourceModal show={createItemModalIsOpen} toggleModal={toggleCreateItemModal} title={"Add new item"}>*/}
            {/*    {(toggleCreateItemModal,*/}
            {/*        rItemTableData,*/}
            {/*        setNewRowData,*/}
            {/*        rItemCategories,*/}
            {/*        rUnitTypes,*/}
            {/*        rItem)=>(<ItemForm */}
            {/*            toggleModal={toggleCreateItemModal}*/}
            {/*            rItemTableData={rItemTableData}*/}
            {/*            setNewRowData={setNewRowData}*/}
            {/*            rItemCategories={rItemCategories}*/}
            {/*            rUnitTypes={rUnitTypes}*/}
            {/*            rItem={rItem}*/}
            {/*    />)}*/}
            {/*</AddNewResourceModal>*/}

            <CreateItemModal
                show={createItemModalIsOpen}
                toggleModal={toggleCreateItemModal}
                setNewRowData={setNewRowData}
                rItemTableData={rExpenseForm.expenseItems}
            />
            <div style={{width:"80%",margin:"auto"}}>
            <Formik
                initialValues={{
                    expenseName:_.isUndefined(initialValue) ? "" : initialValue.expenseName,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, {setSubmitting, resetForm}) => {

                    const reqBody = {
                        "expenseForm":rExpenseForm,
                        "items":rItemTableData,
                    }

                    setFetchingExpense(true);
                    const method = (update) ? "PATCH" : "POST"

                    saveExpense(method,reqBody)
                        .then(async (response) =>{
                            if(response.ok){
                                toggleModal();
                                let message =  (update) ? "New expense was successfully updated!" : "New expense was successfully created!"
                                handleExpenseResponse(response,message )
                                dispatch(expenseTrackersInValidate({data:true}))
                                dispatch(expenseTrackerThunk())
                                dispatch(clearExpenseForm())
                                dispatch(clearItemTableState())
                            }else{
                                let message =  (update) ? "New expense couldn't be updated!" : "New expense couldn't be created!"

                                handleExpenseResponse(response, null,message)
                            }
                            //TODO error handling
                        }).then(()=>{
                            setFetchingExpense(false);
                        });
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
                                                onChange={(e)=>handleFormFieldOnBlur(e,values.name)}
                                            >
                                                <>
                                                    <option >Choose an address</option>
                                                    <option value="CREATE">Create new ...</option>
                                                    {
                                                        rExpenseAddresses.map((address)=>{
                                                            const isSelected = _.isUndefined(initialValue) ? false : _.isNull(initialValue.expenseAddress) ? false : initialValue.expenseAddress.name === address.name
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
                                                onChange={(e)=>handleFormFieldOnBlur(e,values.name)}

                                            >
                                                <>
                                                    <option >Choose an payment type</option>
                                                    <option value="CREATE">Create new ...</option>
                                                    {rExpensePaymentType.map((expensePaymentType)=>{
                                                        const isSelected = _.isUndefined(initialValue) ? false : _.isNull(initialValue.expensePaymentType) ? false : initialValue.expensePaymentType.name === expensePaymentType.name
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
                                                onChange={(e)=>handleFormFieldOnBlur(e,values.name)}
                                            >
                                                <>
                                                    <option >Choose an expense type</option>
                                                    <option value="CREATE">Create new ...</option>
                                                    {
                                                        rExpenseType.map((expenseType)=>{
                                                            const isSelected = _.isUndefined(initialValue) ? false : _.isNull(initialValue.expenseType) ? false : initialValue.expenseType.name === expenseType.name
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
                                <Row >
                                    <Accordion defaultActiveKey="0">
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>Items</Accordion.Header>
                                            <Accordion.Body>
                                                <TableToolBar clear= {clearTable} add={addTableRow} remove={removeTableRow} toggleModal={toggleCreateItemModal} disable={disable}/>
                                                <Row>
                                                    <ItemsTable
                                                        data={rExpenseForm.expenseItems}
                                                        errors={errors}
                                                        formikValues={values}
                                                        disable={disable}
                                                        touched={touched}
                                                        handleChange={handleChange}
                                                        handleBlur={handleBlur}
                                                        setFieldValue={setFieldValue}
                                                        setFieldTouched={setFieldTouched}
                                                        setSelectedExpense={setSelectedExpense}
                                                        removeSelectedTableRow={removeSelectedTableRow}
                                                        setNonExistingUnitOption={setNonExistingUnitOption}
                                                        setNonExistingCategoryOption={setNonExistingCategoryOption}
                                                        setNonExistingItemOption={setNonExistingItemOption}
                                                        nonExistingUnitOptionIsValid={nonExistingUnitOptionIsValid}
                                                        nonExistingItemOptionIsValid={nonExistingItemOptionIsValid}
                                                        nonExistingItemCategoryOptionIsValid={nonExistingItemCategoryOptionIsValid}
                                                    />
                                                </Row>
                                                <Row>
                                                    <Col md={10}/>
                                                    <Col md={2}>
                                                        <Form.Group as={Col}>
                                                            Total:
                                                            <FormControl value={expenseTotalPrice} disabled={true}/>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </Row>

                                <Row>
                                    <Form.Group>
                                        <Row style={{marginTop:5+"vh"}}>
                                            <Col md={1}>
                                                <Button variant="secondary" onClick={toggleModal}>
                                                    {(!disable) ? "Cancel": "Close"}
                                                </Button>
                                            </Col>
                                            {
                                                (!disable) ?
                                                    <Col md={1}>
                                                        <Button variant="primary" type="submit" disabled={isSubmitting}>{(update ? "Update" : "Submit")}</Button>
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