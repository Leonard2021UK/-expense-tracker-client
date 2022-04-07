import React, {useState} from "react";
import {
    Button,
    Col,
    Form,
    Row,
    ToastContainer
} from "react-bootstrap";
import {Formik} from "formik";
import * as Yup from 'yup';
import {useDispatch} from "react-redux";
import _ from "lodash";
import './expenseTypeFormStyle.css';
import {useApiService} from "../../../services/useApiService";
import {useResponse} from "../../../customHooks/useResponse";
import {expenseTypeInValidate, expenseTypeThunk} from "../../../redux/features/suggestions/expenseTypeSuggestionSlice";

const ExpenseTypeForm = (props) =>{


    const dispatch = useDispatch();

    const nameMinLength = 3;

    const {toggleModal} = props;

    const [fetchingNewExpenseType,setFetchingNewExpenseType] = useState(false);
    const [savedNewExpenseType,setSavedNewExpenseType] = useState({});

    const [handleNewExpenseTypeResponse] = useResponse(setSavedNewExpenseType);

    const {expenseTypeApiModule} = useApiService();

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
                        expenseTypeApiModule().saveExpenseType("POST",values)
                            .then(async (response)=>{
                                if(response.ok){
                                    toggleModal();
                                    handleNewExpenseTypeResponse(response, "New item was successfully created!")
                                    dispatch(expenseTypeInValidate({data:true}));
                                    dispatch(expenseTypeThunk());
                                }else{
                                    toggleModal();
                                    handleNewExpenseTypeResponse(response, null,"New item couldn't be created!")

                                }
                        //TODO error handling
                            }).then(()=>{
                            setFetchingNewExpenseType(false);
                        })
                        // Sets setSubmitting to false after form is reset
                        setSubmitting(false);
                    }}
                >
                    {(
                        {
                            handleSubmit,
                            handleChange,
                            touched,
                            errors,
                            isSubmitting,
                        }
                    )=>(
                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        placeholder="Enter name"
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

export default ExpenseTypeForm;


