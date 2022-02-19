import { Row, Col, Image } from "react-bootstrap";
import { userImages } from "../getAllImages/GetImages";

export default function Transaction(){
    return(
        <>
            <Col>
                <Row className="mb-4 d-flex align-items-center justify-content-center">
                    <Col md={4}>
                        <Image src={userImages.productTransaction}></Image>
                    </Col>
                    <Col>
                        <div className="name-date lh-xs mt-2">
                            <p className="fs-6 fw-bold text-red">Ice Coffe Palm Sugar</p>
                            <p className="fs-8"> <span class="fw-bold text-red">Saturday</span> , 5 March 2020</p>
                        </div>
                        <div className="lh-xs">
                            <p className='fs-8'>Toping: Bill Berry Boba, Bubble Tea Gelatin</p>
                            <p className="fs-8">Price: 33.000</p>
                        </div>
                    </Col>
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
                        <Image src={userImages.qrTransaction}></Image>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className='fs-8 text-soft-blue bg-soft-blue py-2 fw-bold'>On The Ways</p>
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