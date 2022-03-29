import React from "react";
import {Col, Container, Modal, Row} from "react-bootstrap";

function AddNewResourceModal(props){

    const{show,toggleModal,title} = props;

    return(
        <Modal
            show={show}
            onHide={toggleModal}
            backdrop="static"
            dialogClassName="modal-50w"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container fluid style={{padding:1+"vw"}}>
                    <Row>
                        <Col>{
                            props.children(toggleModal)
                        }
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    )
}

export default AddNewResourceModal;