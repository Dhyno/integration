import { Container, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import unauthorizedImage from "../../assets/images/emptyPage/unauthorized.svg"

export default function UnauthorizedAdmin(props){

    return(
        <Container className="text-center">
            <Image className="page-empty1" src={unauthorizedImage}></Image>
            <h4 className="fw-bold text-soft-red my-4">Oooppsss you are not as user please do not order</h4>
            <button onClick={()=> props.deactive()} className="admin-send fw-bold">Okay</button>
        </Container>
    )
}