import React,{useState} from "react";
import { Container, Row, Col, Image, Button,Form, Modal } from "react-bootstrap";
import { UserTotalChartRender, FormUserChart, TotalPrice, userChartOrder } from '../containerExport/exportModule'
import { useNavigate } from "react-router-dom";
import { dataLogin } from "../data/orderDataDumies/dataLogin";

export default function UserChart(){
    const [showProcess, setShowProcess] = useState(false);

    const handleCloseProcess = () =>{
        setShowProcess(false);
        // dataLogin.isLogin=false;
        navigate('/');
    }
    const handleShowProcess = (e) => {
        e.preventDefault();
        setShowProcess(true);
    }

    const navigate=useNavigate();

    return(
        <Container className='text-red'>
            <h2>My Chart</h2>
            <h5 className='pb-2'>Review Your Order</h5>
            <Row className='d-flex justify-content-between'>
                <Col md={7} className='border-top b-red'>
                    { userChartOrder.map( data  => <UserTotalChartRender data={ data }/> ) }
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