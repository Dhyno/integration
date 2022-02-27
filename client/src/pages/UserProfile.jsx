import { useContext, useEffect,useState } from "react";
import { Container, Row, Col, Carousel, Image } from "react-bootstrap";
import { Profile, Transaction } from '../containerExport/exportModule';
import { API } from '../config/api';
import { ProductContext } from "../context/productContext";
import UserTransactionPageEmpty from "../components/emptyPage/UserTransactionPageEmpty";

export default function UserProfile(){

    const [productState, dispatchProduct] = useContext(ProductContext)

    const [transaction, setTransaction]= useState([]);
    const [emptyPage, setEmptyPage]=useState(false);

    const getData = async () =>{
        const token= localStorage.getItem('token')
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,//decode token to get id that current login
            },
        };
        const response= await API.get('/my-fix_transaction',config);
        setTransaction(response.data.resultToSend);
        response.data.resultToSend.length===0 && setEmptyPage(true);
    }
    useEffect(()=>{
        getData();      
    },[])

    return(
        <Container className='my-5'>
            <Row>
                <Col md={6}>
                    <h2 className='fw-bold text-red mb-4'>My Profile</h2>
                    <Profile />
                </Col>
                <Col className='text-soft-red'>
                    {emptyPage ? <UserTransactionPageEmpty />
                        :
                        <>
                            <h2 className='my5 fw-bold text-soft-red'>My Transaction</h2>
                            <Carousel fade variant="dark">
                                {
                                    transaction.map( (data)=>{
                                        return(
                                            <Carousel.Item className="overflow-visible">
                                                <Row className='d-flex over align-items-center bg-soft-red py-4 px-4 order-border'>
                                                    <Transaction data={data}/>
                                                </Row>
                                            </Carousel.Item>
                                        )
                                    } )
                                }
                            </Carousel>
                        </>
                    }
                </Col>
            </Row>
        </Container>
    );
}