import React from "react";
import {Col, Container, Modal, Row} from "react-bootstrap";
import ExpensesTable from "../../ExpensesTable/ExpensesTable";
import ExpenseTrackerForm from "../../Forms/ExpenseTrackerForm/ExpenseTrackerForm";
import {useDispatch, useSelector} from "react-redux";

function CreateExpenseTrackerModal(props){

    const rMainCategory= useSelector((state) => state.suggestions.mainCategory.response);

    const{show,handleClose} = props;

    return(
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            dialogClassName="modal-50w"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Create new expense tracker</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/*<div style={{width:"80%",margin:"auto"}}>*/}
                <Container fluid style={{padding:1+"vw"}}>
                    <Row>
                        <Col>
                            <ExpenseTrackerForm mainCategories={rMainCategory}/>
                        </Col>
                    </Row>
                </Container>

                {/*</div>*/}
            </Modal.Body>
            {/*<Modal.Footer>*/}
            {/*    <Button variant="secondary" onClick={handleClose}>*/}
            {/*        Close*/}
            {/*    </Button>*/}
            {/*    <Button variant="primary" disabled={isSubmitting}> Register</Button>*/}
            {/*</Modal.Footer>*/}
        </Modal>
    )
}

export default CreateExpenseTrackerModal;