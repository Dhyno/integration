import { useState, useEffect } from "react";
import { Row, Col, Image, Carousel, Modal } from "react-bootstrap";
import { API } from "../../../config/api";
import { userImages } from "../getAllImages/GetImages";


//componen use for page prodile user and admin page
export default function Transaction( { data } ){

    const [comment, setComment]=useState('');//message from employe comment to show fr user
    const [showComment, setShowComment] = useState(false);
    const handleCloseComment = () => setShowComment(false);
    const handleShowComment = () => setShowComment(true);

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
                        { status.success && <p className={`fs-8 success-status status2 py-2 fw-bold cursor-p`}>Success</p> }
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
        </>
    );
}