import React from "react";
import { Row, Col,Image } from "react-bootstrap";
import deleteIcon from '../../../assets/icons/delete-icon.svg'

//component to render product from userchart.jsx
export default function UserTotalChartRender( { data } ){
    console.log(data);
    return(
        <Row className='d-flex align-items-center justify-content-between mt-2 mb-4'>
            <Col md={2}>
                <Image src={data.product.image} className="img-fluid order-border"></Image>
            </Col>
            <Col md={8}>
                <p class="fw-bold">{data.product.name}</p>
                <p> Toping: {data.toping.name}</p>
            </Col>
            <Col className='text-end'>
                <p>{data.product.price}</p>
                <Image src={deleteIcon}></Image>
            </Col>
        </Row>
    );
}