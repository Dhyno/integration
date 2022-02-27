import { Container, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import shopingImage from "../../assets/images/emptyPage/userChart.svg"

export default function UserChartPageEmpty(){

    const navigate=useNavigate();

    return(
        <Container className="text-center">
            <Image className="page-empty" src={shopingImage}></Image>
            <h4 className="fw-bold text-soft-red my-4">Oooppsss your order is empty</h4>
            <button onClick={()=> navigate("/")} className="admin-send fw-bold">Order Now</button>
        </Container>
    )
}