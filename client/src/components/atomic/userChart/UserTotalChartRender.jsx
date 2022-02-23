import React, { useEffect } from "react";
import { useState } from "react";
import { Row, Col,Image } from "react-bootstrap";
import deleteIcon from '../../../assets/icons/delete-icon.svg'

//component to render product from userchart.jsx
export default function UserTotalChartRender( { data } ){

    console.log(data);
    // const [topping,setTopping]=useState([])

    // useEffect(()=>{
    //     setTopping(data.toppings)
    // },[])

    return(
        <Row className='d-flex align-items-center justify-content-between mt-2 mb-4'>
            <Col md={2}>
                {/* <Image src={data.product.image} className="img-fluid order-border"></Image> */}
            </Col>
            <Col md={8}>
                <p class="fw-bold">{data.title}</p>
                <p> Toping: </p>   
            </Col>
            <Col className='text-end'>
                <p>{data.price}</p>
                <Image src={deleteIcon}></Image>
            </Col>
        </Row>
    );
}