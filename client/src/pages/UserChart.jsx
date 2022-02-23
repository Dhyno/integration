import React,{useContext, useEffect, useState} from "react";
import { Container, Row, Col, Image, Button,Form, Modal } from "react-bootstrap";
import { UserTotalChartRender, FormUserChart, TotalPrice, userChartOrder } from '../containerExport/exportModule'
import { useNavigate } from "react-router-dom";
import { dataLogin } from "../data/orderDataDumies/dataLogin";
import { API } from "../config/api";
import { ProductContext } from "../context/productContext";

export default function UserChart(){

    const navigate=useNavigate();

    const [productState, dispatchProduct] = useContext(ProductContext)

    const [showProcess, setShowProcess] = useState(false);
    const [product, setProduct]=useState([]);

    const handleCloseProcess = () =>{
        setShowProcess(false);
        navigate('/');
    }
    const handleShowProcess = (e) => {
        e.preventDefault();
        setShowProcess(true);
    }  

    const getData = async () => {
        try{
            const idTransaction=productState.idTransaction
            const responseAPI= await API.get(`/transaction/${idTransaction}`)
            // console.log(responseAPI);
            const getProduct=responseAPI.data.resultToSend.order;
            setProduct(getProduct); 

        } catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        getData();
    },[])
    

    return(
        <Container className='text-red'>
            <h2>My Chart</h2>
            <h5 className='pb-2'>Review Your Order</h5>
            <Row className='d-flex justify-content-between'>
                <Col md={7} className='border-top b-red'>
                    { product.map( data  => <UserTotalChartRender keyValue={data.id} data={ data }/> ) }
                    <TotalPrice />
                </Col>
                <Col md={4}>
                    <Form>
                        <FormUserChart />
                        <Button onClick={handleShowProcess} type='submit' className='bg-red text-light fw-bold w-100'>Pay</Button>
                    </Form>
                </Col>
            </Row>


            <Modal show={showProcess} centered onHide={handleCloseProcess} className='d-flex align-items-center'>
                <Modal.Body><p className='text-center pt-4 pb-2 text-order px-2'>Thank you for ordering in us, please wait to verify you order</p></Modal.Body>
            </Modal>
        </Container>
    );
}