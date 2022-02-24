import { useState, useEffect } from "react";
import { Row, Col, Image } from "react-bootstrap";
import { userImages } from "../getAllImages/GetImages";

export default function Transaction( { data } ){

    const [status, setStatus]=useState(null)
    const [order, setOrder]=useState([])

    const show = ()=> {
        order.map( data => {
            console.log(data.toppings);
        })
    }

    useEffect(()=> {
        data.status=="Waiting Approve" && setStatus("Process");
        setOrder(data.order)
    },[])

    return(
        <>
            <Col>
                <Row className="mb-4 d-flex align-items-center justify-content-center">
                    {
                        order.map( data => {
                            return(
                                <Row className="d-flex align-items-center">
                                    <Col md={4}>
                                        <Image className="tr-profile-img" src={data.image}></Image>
                                    </Col>
                                    <Col>
                                        <div className="name-date lh-xs mt-2">
                                            <p className="lh-s fw-bold text-red">{data.title}</p>
                                            <p className="fs-8"> <span class="fw-bold text-red">Saturday</span> , 5 March 2020</p>
                                        </div>
                                        <div className="lh-xs">
                                            <p className='fs-8'>Toping: {
                                                data.toppings.map( topping => <span> {topping.name}, </span>)
                                            }</p>
                                            <p className="fs-8">Price: 33.000</p>
                                        </div>
                                    </Col>
                                </Row>
                            )
                        })
                    }
                    
                </Row>
            </Col>
            <Col md={4} className='text-center'>
                <Row>
                    <Col className='mb-1'>
                        <Image src={userImages.navIcon}></Image>
                    </Col>
                </Row>
                <Row>
                    <Col className='my-3'>
                        <Image className="tr-profile-img" src={data.attachment}></Image>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p onClick={show} className='fs-8 text-soft-blue bg-soft-blue py-2 fw-bold'>{status}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className='fs-8 fw-bold'></p>
                    </Col>
                </Row>
            </Col>
        </>
    );
}