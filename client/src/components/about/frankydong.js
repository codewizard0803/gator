import React from 'react';
import {Jumbotron, Container, Row, Col} from 'react-bootstrap'

class FrankyDong extends React.Component {
    render() {
        return (
        <div>
        <Jumbotron>
            <Container>
                <Row>
                <Col>
                <h1>About Franky</h1>
                <p>
                I like to code and I have a dog named Sushi. I am graduating in August 2019! I am into coding, cars, and crypto!
                </p>
                </Col>
                </Row>
            </Container>
        </Jumbotron>
        </div>
        );
    }
}



export default FrankyDong