
import { useState } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import invoices from '../../../assets/images/userChart/invoices.svg'

export default function TotalPrice(props){
    const [total,setTotal]=useState(props.data);
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
                        <p>{props.data.totalPrice}</p>
                        <p>{props.data.qty}</p>
                        <p class="fw-bold">{props.data.totalPrice}</p>
                    </Col>  
                </Row>
            </Col>
            <Col md={4} className='py-4 text-center bg-soft-red border border-2 b-red order-border'>
                <Image src={invoices}></Image>
            </Col>
        </Row>
    );
}