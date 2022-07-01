import { Row, Col, Image } from "react-bootstrap"
import defaultUser from '../../../assets/images/user/default-user.png'


export default function MessageUser(props){
    const { data,changeMsg } =props;
    const filterMsg= data.Commentuser.length>29 ? data.Commentuser.slice(0,29)+'...' : data.Commentuser;
    return(
        <>
            <Row onClick={()=>changeMsg()} className="d-flex align-items-center mb-4 cursor-p">
                <Col md={2}>
                    <Image className="tb-user-image" src={data.customer.image}></Image>
                </Col>
                <Col md={10}>
                    <h6 class="fw-bold">{data.name}</h6>
                    <h6 class="text-secondary">{filterMsg}</h6>
                </Col>
            </Row>
        </>
    )
}