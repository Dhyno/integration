import { useEffect,useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Profile, Transaction } from '../containerExport/exportModule';
import { API } from '../config/api';

export default function UserProfile(){

    const [transaction, setTransaction]= useState([]);

    const getData = async () =>{
        const token= localStorage.getItem('token')
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,//decode token to get id that current login
            },
        };
        const response= await API.get('/my-fix_transaction',config);
        setTransaction(response.data.resultToSend);
        console.log(response.data.resultToSend);
    }
    useEffect(()=>{
        getData();      
    },[])

    return(
        <Container className='my-5 '>
            <Row>
                <Col>
                    <h2 className='fw-bold text-red'>My Profile</h2>
                    <Profile />
                </Col>
                <Col className='text-soft-red'>
                    <h2 className='my5 fw-bold text-soft-red'>My Transaction</h2>

                    {
                        transaction.map( (data)=>{
                            return(
                                <Row className='d-flex align-items-center bg-soft-red py-4 px-4 order-border'>
                                    <Transaction data={data}/>
                                </Row>
                            )
                        } )
                    }

                </Col>
            </Row>
        </Container>
    );
}