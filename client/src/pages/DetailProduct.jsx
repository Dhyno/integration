import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { TopingRender, productList, productHero, topingData } from '../containerExport/exportModule';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { API } from '../config/api';
import { ProductContext } from '../context/productContext';

export default function DetailProduct(){
    const id=useParams().id;

    const [productState, dispatchProduct] = useContext(ProductContext);

    const [toppings,setToppings]=useState([]);
    const [productDetail,setProductDetail]=useState({});

    const getData = async () =>{
        try{
            const response=await API.get(`/product/${id}`);
            setProductDetail(response.data.data.product);
            
            // dispatchProduct({ type: "LOAD_PRODUCT_PRICE", action: productDetail.price});
            // console.log(productDetail)

            const toppingresponse=await API.get('/toppings')
            setToppings(toppingresponse.data.data.toppings)
            
        } catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        getData();
    },[])

    useEffect(()=>{
       if(productDetail===null){
        console.log("empty")
        } else{
            dispatchProduct({ type: "LOAD_PRODUCT_PRICE", payload: productDetail.price})  
        }
    },[productDetail])
    

    const navigate=useNavigate();

    return(
        <Container>
            <Row>
                <Col md={6}>
                    <Image className='img-fluid product-detail-hero' src={productDetail.image}></Image>
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <h1 className="text-red">{productDetail.name}</h1>
                            <p className="mb-5 fs-4 text-soft-red">{productState.productPrice}</p>
                            <h5 className="mb-5 fw-bold fs-4 text-soft-red">Toping</h5>
                        </Col>
                        <Row className='mb-5'>
                            {/* { topingData.map( ( data,i) => <TopingRender getChange={(val)=> caughtChange(val) } data={data} keyvalue={i}/> ) } */}
                            { toppings.map( ( data ) => <TopingRender  data={data} keyvalue={data.id}/> ) }
                        </Row>
                    </Row>
                    <Row>
                        <Col>
                            <h5 className="fw-bold fs-4 text-soft-red">Total</h5>
                        </Col>
                        <Col className='text-end'>
                            <h5 className="fw-bold fs-4 text-soft-red">{productDetail.price}</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Button onClick={()=>navigate('/userchart')} className="btn btn-danger w-100 my-5 bg-red">Add Chart</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}