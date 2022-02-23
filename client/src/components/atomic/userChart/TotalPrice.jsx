
import { useState } from 'react';
import { Row, Col, Image, Form } from 'react-bootstrap';
import invoices from '../../../assets/images/userChart/invoices.svg'

export default function TotalPrice(props){
    const [total,setTotal]=useState(props.data);
    const [preview,setPreview]=useState(null);

    const getChange = e => {
        let imageFile=e.target.files[0];
        let url = URL.createObjectURL(imageFile);
        setPreview(url);
        props.getImage(imageFile)
    }

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
            <Col md={4} className='pb-4 pt-5 cursor-p text-center bg-soft-red border border-2 b-red order-border'>
                <Form>
                    <Form.Group>
                        <Form.Label for='picture'>
                            <Image className="cursor-p img-fluid order-border" src={ preview ? preview : invoices}></Image>
                        </Form.Label>
                        {/* <Form.Control onChange={e => isChange(e)} type="file" name="image" id='picture' className='border-2 b-red bg-soft-red' placeholder="Photo Product" hidden /> */}
                        <Form.Control onChange={e => getChange(e)} type="file" name="image" id='picture' className='border-2 b-red bg-soft-red' placeholder="Photo Product" hidden />
                    </Form.Group>
                </Form>
                
                <p className='text-dark'>add attachment</p>
            </Col>
        </Row>
    );
}