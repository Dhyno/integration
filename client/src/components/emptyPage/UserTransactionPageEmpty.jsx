import { Container, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import creditImage from "../../assets/images/emptyPage/profile.svg"

export default function UserTransactionPageEmpty(){

    const navigate=useNavigate();

    return(
        <Container className="text-center">
            <Image className="page-empty" src={creditImage}></Image>
            <h4 className="fw-bold text-soft-red my-4">Oooppsss you havent make transaction yet</h4>
            <button onClick={()=> navigate("/")} className="transaction-btn fw-bold">Order Now</button>
        </Container>
    )
}