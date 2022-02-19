import { Container, Row, Col, Image } from "react-bootstrap";
import { Profile, Transaction } from '../containerExport/exportModule';

export default function UserProfile(){
    return(
        <Container className='my-5 '>
            <Row>
                <Col>
                    <h2 className='fw-bold text-red'>My Profile</h2>
                    <Profile />
                </Col>
                <Col className='text-soft-red'>
                    <h2 className='my5 fw-bold text-soft-red'>My Transaction</h2>
                    <Row className='d-flex align-items-center bg-soft-red py-4 px-4 order-border'>
                        <Transaction />
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}