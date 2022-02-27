import { Row, Col, Image } from "react-bootstrap"
import defaultUser from '../../../assets/images/user/default-user.png'


export default function ComplaintUser(){

    return(
        <>
            <Col md={5}>
                <Row className="d-flex align-items-center mb-4">
                    <Col md={2}>
                        <Image className="tb-user-image" src={defaultUser}></Image>
                    </Col>
                    <Col md={10}>
                        <h6 class="fw-bold">Tylor</h6>
                        <h6 class="text-secondary">i think this sould be make me...</h6>
                    </Col>
                </Row>
                <Row className="d-flex align-items-center mb-4">
                    <Col md={2}>
                        <Image className="tb-user-image" src={defaultUser}></Image>
                    </Col>
                    <Col md={10}>
                        <h6 class="fw-bold">Tylor</h6>
                        <h6 class="text-secondary">i think this sould be make me...</h6>
                    </Col>
                </Row>
            </Col>

            <Col md={7}>
                <h2 class="head-message py-2 mb-4 fw-bold">bad Service</h2>
                <Row className="d-flex align-items-center mb-4">
                    <Col md={1}>
                        <Image className="tb-user-image" src={defaultUser}></Image>
                    </Col>
                    <Col md={10}>
                        <h6 class="fw-bold">katrrina sovlov schist vangerskaya</h6>
                    </Col>
                </Row>
                <h6 class="mb-4 text-secondary">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus eaque exercitationem voluptatem minima et ea facilis vel ipsam sint quo dolore facere aut a voluptates, illum atque! Laudantium, quae ipsa?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet beatae facere debitis et, dignissimos nihil! Nobis eius dolore maiores nulla voluptatem, aliquam quo? Et id asperiores vel, corporis voluptatum reprehenderit?
                    Lorem ipsum dolor sit amet connsectetur adipisicing elit. Doloremque adipisci sequi doloribus dolorem, explicabo ea ex, necessitatibus odio nam tempora non earum dicta. Sint fuga quos sit? Voluptates, quisquam omnis!
                </h6>
                <div class="text-end fw-bold">
                    <button class="admin-send fw-bold">Feedback</button>
                </div>
            </Col>
        </>
    )
}