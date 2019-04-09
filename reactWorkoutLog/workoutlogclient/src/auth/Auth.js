import React from 'react';
import { Container, Row, Col} from 'reactstrap';
import Signup from './Signup';
import Login from './Login';

const Auth = (props) => {
    return(
        <Container>
            <Row>
                <Col md='6'>
                    <Signup setToken={props.setToken} />
                </Col>
                <Col md='6'>
                    <Login setToken={props.setToken} />
                </Col>
            </Row>
        </Container>
    )
}

export default Auth;