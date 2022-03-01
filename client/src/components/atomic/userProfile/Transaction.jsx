import { useState, useEffect } from "react";
import { Row, Col, Image, Form, Carousel, Modal } from "react-bootstrap";
import { API } from "../../../config/api";
import { userImages } from "../getAllImages/GetImages";


//componen use for page prodile user and admin page
export default function Transaction( { data } ){

    const [comment, setComment]=useState('');//message from employe comment to show fr user
    const [showComment, setShowComment] = useState(false);
    const handleCloseComment = () => setShowComment(false);
    const handleShowComment = () => setShowComment(true);

    const [showRate, setShowRate] = useState(false);
    const handleCloseRate = () => setShowRate(false);
    const handleShowRate = () => setShowRate(true);

    const [showDone, setShowDone] = useState(false);
    const handleCloseDone = () => setShowDone(false);
    const handleShowDone = () => setShowDone(true);

    const [order, setOrder]=useState([])
    const [totalOne, setTotalOne]=useState([]);
    const [status, setStatus]=useState({});

    //show modal to user that comment from admin/delivery
    const show = async ()=> {
        const response= await API.get(`/ratestatus/${data.id}`);
        setComment(response.data.result.employeeComment);
        handleShowComment();
        // console.log(data.id);
    }

    const sendRate = async  e => {
        e.preventDefault();

        handleCloseRate();
        handleShowDone();

        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        let customerRate={
            message: e.target.message.value,
            rating: e.target.rate.value
        }

        let body = JSON.stringify(customerRate);

        const response= await API.patch(`/ratestatuses/${data.id}`,body, config);
        console.log(response);

        // console.log(data.id);
        // console.log(e.target.message.value);
        // console.log(e.target.rate.value);
    }

    useEffect(()=> {
        data.status=="Waiting Approve" && setStatus({waiting:true});
        data.status=="Cancel" && setStatus({cancel:true});
        data.status=="On The Way" && setStatus({onTheWay:true});
        data.status=="Success" && setStatus({success:true});
        data.status=="Pending" && setStatus({pending:true});

        setOrder(data.order)
        let totalAll=[];
        for(let i=0; i<data.order.length; i++){
            let totalTopping=0;
            let productPrice=data.order[i].price;
            for(let j=0; j<data.order[i].toppings.length; j++){
                totalTopping+=data.order[i].toppings[j].price;
                // console.log(data.order[i].toppings[j].price);
            }
            productPrice+=totalTopping
            totalAll.push(productPrice);
        }
        setTotalOne(totalAll);
    },[])

    return(
        <>
            <Col md={8} className="order-border">
                <Row className="mb-4 d-flex align-items-center justify-content-center">
                    {
                        order.map( ( data, i ) => {
                            return(
                                <Row className="d-flex align-items-center">
                                    <Col md={4}>
                                        <Image className="img-fluid" src={data.image}></Image>
                                    </Col>
                                    <Col md={8}>
                                        <div className="name-date lh-xs mt-2">
                                            <p className="lh-s fw-bold text-red">{data.title}</p>
                                            <p className="fs-8"> <span class="fw-bold text-red">Saturday</span> , 5 March 2020</p>
                                        </div>
                                        <div className="lh-xs">
                                            <p className='fs-8'>Toping: {
                                                data.toppings.map( topping => <span> {topping.name}, </span>)
                                            }</p>
                                            <p className="fs-8">Price: {totalOne[i]}</p>
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
                        { status.success && <p onClick={handleShowRate} className={`fs-8 success-status status2 py-2 fw-bold cursor-p`}>Success</p> }
                        { status.pending && <p onClick={show} className={`fs-8 pending-status status5 py-2 fw-bold cursor-p`}>Pending</p> }
                        { status.cancel && <p onClick={show} className={`fs-8 cancel-status status3 py-2 fw-bold cursor-p`}>Cancel</p> }
                        { status.onTheWay && <p className={`fs-8 way-status status4 py-2 fw-bold`}>On The Way</p> }
                        { status.waiting && <p className={`fs-8 wait-status status1 py-2 fw-bold`}>Process</p> }
                        <p className='fs-8 text-soft-red fw-bold'>Total : {data.income}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className='fs-8 fw-bold'></p>
                    </Col>
                </Row>
            </Col>

            <Modal show={showComment} size="md" centered onHide={handleCloseComment} className='py-2'>
                <Modal.Body className="text-end">
                    <h6 className="text-start my-5">{comment}</h6>
                    <button onClick={handleCloseComment} type="submit" class="admin-send fw-bold my-2 px-4">OK</button>
                </Modal.Body>
            </Modal> 

            <Modal show={showDone} size="md" centered onHide={handleCloseDone} className='py-2'>
                <Modal.Body className="text-center">
                    <h4 className="my-5">Thank you for rate</h4>
                    <button onClick={handleCloseDone}  class="admin-send fw-bold my-2 px-4">OK</button>
                </Modal.Body>
            </Modal> 
            
            <Modal show={showRate} size="md" centered onHide={handleCloseRate} className='py-2'>
                <Modal.Body className="text-end"> 
                    <Form onSubmit={sendRate}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control name="message" as="textarea" className='bg-orange' rows={5} placeholder="Please give your rate about this" />
                            <h6 className="fw-bold text-soft-red mt-2 text-start">1 to 100</h6>
                            <Form.Control name="rate" type="number" min="1" max="100" className="mb-2" />
                            <button type="submit" class="admin-send fw-bold">Send</button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal> 

        </>
    );
}