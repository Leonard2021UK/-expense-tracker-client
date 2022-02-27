import {Card, Col, Row} from "react-bootstrap";


const DashboardGridCards = ()=>{

    return(
        <Row xs={1} md={2} className="g-4" style={{marginTop:2+"em"}}>
            {Array.from({ length: 4 }).map((_, idx) => (
                <Col>
                    <Card
                        bg={"light"}
                        key={idx}
                        // text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
                        text={"text"}

                        style={{ width: '45rem' }}
                        className="mb-2"
                    >
                        <Card.Header>Header</Card.Header>
                        <Card.Body>
                            <Card.Title>{"dark"} Card Title </Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk
                                of the card's content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default DashboardGridCards;