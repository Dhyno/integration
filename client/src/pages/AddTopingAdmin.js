import React from "react";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";

import productImage from '../assets/images/largeImages/product-hero.svg';
import AddProduct from "../components/atomic/addProductAdm/AddProduct";
 
export default function AddTopingAdmin(){
    return(
        <Container>
            <Row className='d-flex justify-content-between'>
                <Col>
                    <h2 className='text-red fw-bold'>toping</h2>
                    <Form>
                        <AddProduct />
                        <Button type='submit' className='bg-red text-light fw-bold w-100'>Add Toping</Button>
                    </Form>
                </Col>
                <Col md={6}>
                    <Image src={productImage}></Image>
                </Col>
            </Row>
        </Container>
    );
}