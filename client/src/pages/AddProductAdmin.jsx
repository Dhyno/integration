import { useState } from "react";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";

import productImage from '../assets/images/largeImages/product-hero.svg';
import AddProduct from "../components/atomic/addProductAdm/AddProduct";
import { API } from "../config/api"
 
export default function AddProductAdmin(){

    const [image, setImage]=useState(null);
    const [preview,setPreview]=useState(null);

    
    const submitFile = async e => {

        e.preventDefault();
        
        const config = {
            headers: {
              "Content-type": "multipart/form-data",
            },
        };

        let formFile= new FormData();

        formFile.set("name", e.target.productname.value)
        formFile.set("price", e.target.price.value)
        formFile.set("image", image);
        console.log(formFile)

        const response = await API.post("/product", formFile, config);
        console.log(response)

    }

    const changeFile = e =>{
        let imageFile=e.target.files[0];
        setImage(imageFile)

        let url = URL.createObjectURL(imageFile);
        setPreview(url);
    }

    return(
        <Container>
            <Row className='d-flex justify-content-between'>
                <Col>
                    <h2 className='text-red fw-bold'>Product</h2>
                    <Form onSubmit={(e)=>submitFile(e)}>
                        <AddProduct isChange={ e => changeFile(e) }/>
                        <Button type='submit' className='bg-red text-light fw-bold w-100'>Add Product</Button>
                    </Form>
                </Col>
                <Col md={6}>
                    <Image className="img-fluid product-img" src={preview ? preview : productImage}></Image>
                </Col>
            </Row>
        </Container>
    );
}