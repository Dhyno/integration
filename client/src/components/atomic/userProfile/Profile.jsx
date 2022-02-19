import { Container, Row, Col, Image } from "react-bootstrap";
import { userImages } from "../getAllImages/GetImages";

export default function Profile(){
    return(
        <>
            <Row>
                <Col md={4}>
                    <Image src={userImages.profile}></Image>
                </Col>
                <Col>
                    <p class="fw-bold text-soft-red m-0">Full Name</p>
                    <p>Rino Saputra</p>
                    <p className="fw-bold text-soft-red m-0">Email</p>
                    <p>rinosaputra133@gmail.com</p>
                </Col>
            </Row>
        </>
    );
}