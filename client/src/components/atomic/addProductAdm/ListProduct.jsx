import { Row, Col, Image } from "react-bootstrap"
import { API } from "../../../config/api"

export default function ListProduct( { data, reRender } ){

    const deleteProduct = async () => {
        const response= await API.delete(`/product/${data.id}`);
        console.log(response);
        reRender();
    }

    return(
        <Row className="my-5 d-flex l-product align-items-center text-center py-2 order-border">
            <Col md={2}>
                <Image className="list-p-adm" src={data.image}></Image>
            </Col>
            <Col>
                <h4 className="text-secondary">{data.name}</h4>
            </Col>
            <Col>
                <h4 className="text-secondary">{data.price}</h4>
            </Col>
            <Col>
                <button onClick={deleteProduct} className="admin-send fw-bold">delete</button>
            </Col>
        </Row>
    )
}