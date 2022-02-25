import React, { useEffect } from "react";
import { useState } from "react";
import { Row, Col,Image } from "react-bootstrap";
import deleteIcon from '../../../assets/icons/delete-icon.svg'

//component to render product from userchart.jsx
export default function UserTotalChartRender( { data, total, getKeyId } ){

    const image=`http://localhost:5000/uploads/${data.image}`;
    const [topping,setTopping]=useState([])
    const [gettotal, setGetTotal]=useState(0);

    const toDelete = () => getKeyId(data.idProductOrder);//pass key id to parenth to re render state

    useEffect(()=>{
        setTopping(data.toppings);
        setGetTotal(total);
    },[])

    return(
        <Row className='d-flex align-items-center justify-content-between mt-2 mb-4'>
            <Col md={2}>
                <Image src={image} className="img-fluid"></Image>
            </Col>
            <Col md={8}>
                <p class="fw-bold">{data.title}</p>
                <p> Toping : { topping.map( topingName => ( <span> { topingName.name } , </span> )) } </p>  
            </Col>
            <Col className='text-end'>
                <p>{total}</p>
                <Image onClick={toDelete} className="cursor-p" src={deleteIcon}></Image>
            </Col>
        </Row>
    );
}