import { userImages } from "../getAllImages/GetImages";
import { Col, Image } from "react-bootstrap";


export default function TransactionProduct( { order } ){

    console.log("here");
    // console.log(order[0].title);
    order.map( data => console.log(data.title) )

    return(
        <>
            {
                order.map( data => <p>{data.title}</p> )
            }
            <Col md={4}>
                <Image className="tr-profile-img" src={userImages.productTransaction}></Image>
            </Col>
            <Col>
                <div className="name-date lh-xs mt-2">
                    <p className="fs-6 fw-bold text-red">{order.title}</p>
                    <p className="fs-8"> <span class="fw-bold text-red">Saturday</span> , 5 March 2020</p>
                </div>
                <div className="lh-xs">
                    <p className='fs-8'>Toping: Bill Berry Boba, Bubble Tea Gelatin</p>
                    <p className="fs-8">Price: 33.000</p>
                </div>
            </Col>
        </>
    )
}