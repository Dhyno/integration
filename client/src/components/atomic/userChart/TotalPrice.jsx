
import { Row, Col, Image } from 'react-bootstrap';
import invoices from '../../../assets/images/userChart/invoices.svg'

export default function TotalPrice(){
    return(
        <Row className='border-top py-5 b-red d-flex align-items-center justify-content-between'>
            <Col md={7}>
                <Row className='border-top b-red py-4'>
                    <Col>
                        <p>Sub total</p>
                        <p>Qty</p>
                        <p class="fw-bold">Total</p>
                    </Col>  
                    <Col className='text-end'>
                        <p>69.000</p>
                        <p>2</p>
                        <p class="fw-bold">69.000</p>
                    </Col>  
                </Row>
            </Col>
            <Col md={4} className='py-4 text-center bg-soft-red border border-2 b-red order-border'>
                <Image src={invoices}></Image>
            </Col>
        </Row>
    );
}