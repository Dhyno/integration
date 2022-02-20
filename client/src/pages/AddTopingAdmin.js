import React,{ useState } from "react";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";

import productImage from '../assets/images/largeImages/product-hero.svg';
import AddProduct from "../components/atomic/addProductAdm/AddProduct";
import fileIcon from "../assets/icons/file.svg";

import { API } from "../config/api";
 
export default function AddTopingAdmin(){

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

        formFile.set("name", e.target. toppingname.value)
        formFile.set("price", e.target.price.value)
        formFile.set("image", image);
        console.log(formFile)

        const response = await API.post("/topping", formFile, config);
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
                    <h2 className='text-red fw-bold'>Toping</h2>
                    <Form onSubmit={(e) => submitFile(e)}>
                        <Form.Group className="mb-5" controlId="exampleForm.ControlInput1">
                        <Form.Control type="text" name="toppingname" className='border-2 b-red bg-soft-red' placeholder="Topping Name" />
                        </Form.Group>
                        <Form.Group className="mb-5" controlId="exampleForm.ControlInput1">
                            <Form.Control type="number" name="price" className='border-2 b-red bg-soft-red' placeholder="Price" />
                        </Form.Group>
                        <Form.Group  className="mb-5 w-100 bg-soft-red border border-2 b-red px-2 d-flex justify-content-between align-items-center" controlId="exampleForm.ControlInput1">
                            <p className='text-secondary'>Topping Image</p>
                            <Form.Label for='picture'>
                                <Image src={fileIcon}></Image>
                            </Form.Label>
                            <Form.Control onChange={(e)=>changeFile(e)}  type="file" name="image" id='picture' className='border-2 b-red bg-soft-red' hidden />
                        </Form.Group>
                        <Button type='submit' className='bg-red text-light fw-bold w-100'>Add Toping</Button>
                    </Form>
                </Col>
                <Col md={6}>
                    <Image src={preview? preview : productImage}></Image>
                </Col>
            </Row>
        </Container>
    );
}