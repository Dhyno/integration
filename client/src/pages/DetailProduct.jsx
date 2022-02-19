import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { TopingRender, productList, productHero, topingData } from '../containerExport/exportModule';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { API } from '../config/api';

export default function DetailProduct(){
    const id=useParams().id;

    const [topping,setTopping]=useState([]);
    const [productDetail,setProductDetail]=useState({});

    // function caughtChange(val){
    //     setPrice(price+val);
    // }

    async function getData(){
        
    }
    useEffect(async()=>{
        const response=await API.get(`/product/${id}`);
        console.log(response);
    },[])
    

    const navigate=useNavigate();

    return(
        <p>test</p>
    )

    // return(
    //     <Container>
    //         <Row>
    //             <Col>
    //                 <Image src={productHero}></Image>
    //             </Col>
    //             <Col>
    //                 <Row>
    //                     <Col>
    //                         <h1 className="text-red">{productList[i].name}</h1>
    //                         <p className="mb-5 fs-4 text-soft-red">{productList[i].price}</p>
    //                         <h5 className="mb-5 fw-bold fs-4 text-soft-red">Toping</h5>
    //                     </Col>
    //                     <Row className='mb-5'>
    //                         { topingData.map( ( data,i) => <TopingRender getChange={(val)=> caughtChange(val) } data={data} keyvalue={i}/> ) }
    //                     </Row>
    //                 </Row>
    //                 <Row>
    //                     <Col>
    //                         <h5 className="fw-bold fs-4 text-soft-red">Total</h5>
    //                     </Col>
    //                     <Col className='text-end'>
    //                         <h5 className="fw-bold fs-4 text-soft-red">{price}</h5>
    //                     </Col>
    //                 </Row>
    //                 <Row>
    //                     <Col md={12}>
    //                         <Button onClick={()=>navigate('/userchart')} className="btn btn-danger w-100 my-5 bg-red">Add Chart</Button>
    //                     </Col>
    //                 </Row>
    //             </Col>
    //         </Row>
    //     </Container>
    // )
}