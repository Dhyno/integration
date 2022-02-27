import { Container, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import serverImage from "../../assets/images/emptyPage/server-error.svg"

export default function ServerError(props){

    return(
        <Container className="text-center">
            <Image className="page-empty" src={serverImage}></Image>
            <h4 className="fw-bold text-soft-red my-4">Status 500</h4>
            <h4 className="fw-bold text-soft-red my-4">There something wrong please comeback later</h4>
        </Container>
    )
}