import { useContext } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { UserContext } from "../../../context/userContextt"
import { userImages } from "../getAllImages/GetImages";


export default function Profile(){

    const [state, dispatch] = useContext(UserContext)
    
    return(
        <>
            <Row>
                <Col md={5}>
                    <Image className="profile-image" src={state.user.image}></Image>
                </Col>
                <Col>
                    <p class="fw-bold text-soft-red m-0">Full Name</p>
                    <p>{state.user.name}</p>
                    <p className="fw-bold text-soft-red m-0">Email</p>
                    <p>{state.user.email}</p>
                </Col>
            </Row>
        </>
    );
}