import React from "react";
import {Col, Container, Modal, Row} from "react-bootstrap";
import ExpenseTrackerForm from "../../Forms/ExpenseTrackerForm/ExpenseTrackerForm";
import {useSelector} from "react-redux";

function CreateExpenseTrackerModal(props){

    const rMainCategory= useSelector((state) => state.suggestions.mainCategory.response);

    const{show,toggleModal} = props;

    return(
        <Modal
            show={show}
            onHide={toggleModal}
            backdrop="static"
            dialogClassName="modal-50w"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Create new expense tracker</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container fluid style={{padding:1+"vw"}}>
                    <Row>
                        <Col>
                            <ExpenseTrackerForm mainCategories={rMainCategory} toggleModal={toggleModal} />

                        </Col>
                    </Row>
                </Container>
            </Modal.Body>

        </Modal>
    )
}

export default CreateExpenseTrackerModal;