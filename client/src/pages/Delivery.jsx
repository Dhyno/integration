import { useEffect,useState } from 'react';
import { Container, Col, Row, Image} from 'react-bootstrap';

import { API } from '../config/api'
import TableDataDelivery from '../components/atomic/delivery/TableData';
import ComplaintUser from '../components/atomic/delivery/ComplaintUser';

import messageImage from '../assets/icons/message.png'
import trolleyMessage from '../assets/icons/basket.png';

export default function Delivery(){

    const [dataCustomer, setDataCustomer]=useState([]);

    const getData = async () =>{
        const config = {
            headers: {
              "Content-type": "application/json",
            },
        };
        let statusJson={ 
            status: 'On The Way' 
        }
        const body = JSON.stringify(statusJson);
        const response = await API.post('/ratestatuses',body,config);
        setDataCustomer(response.data.result);
        console.log(dataCustomer);
    }

    useEffect(()=>{
        getData();
    },[])

    return(
        <Container className="mb-5 del-cnt">
            <Row>

                <Col md={2} className="side-bg py-5" >
                    <Row className="row my-5 ms-2 py-2 order-side">
                        <Col md={3}>
                            <Image className="side-icon" src={trolleyMessage}></Image>
                        </Col>
                        <Col>
                            <h5>Order</h5>
                        </Col>
                    </Row>
                    <Row className="row ms-2 py-2 message-side">
                        <Col md={3}>
                            <Image className="side-icon" src={messageImage}></Image>
                        </Col>
                        <Col>
                            <h5>Message</h5>
                        </Col>
                    </Row>
                </Col>

                <Col>
                    <h2 class="fw-bold">Order</h2>
                    <h6 class="text-secondary mb-5">28 order found</h6>
                    <Row className="mb-4 d-flex justify-content-start">
                        <Col md={2}>
                            <h6 class="fw-bold text-soft-red menu1 cursor-p">All order</h6>
                        </Col>
                        <Col md={2}>
                            <h6 class="fw-bold text-soft-red menu2 cursor-p">Complaint</h6>
                        </Col>
                        <Col md={2}>
                            <h6 class="fw-bold text-soft-red menu3 cursor-p">panding</h6>
                        </Col>
                        <Col md={2}>
                            <h6 class="fw-bold text-soft-red menu4 cursor-p">Complete</h6>
                        </Col>
                    </Row>

                    <Row>
                        <TableDataDelivery data={dataCustomer}/>
                        {/* <ComplaintUser /> */}
                    </Row>
                </Col>
            </Row>

        </Container>
    )
}