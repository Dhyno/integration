import { useState,useEffect } from "react";
import { Container, Modal, Row, Col, Image, Form, Button } from "react-bootstrap";

import ListProduct from "../components/atomic/addProductAdm/ListProduct";

import productImage from '../assets/images/largeImages/product-hero.svg';
import AddProduct from "../components/atomic/addProductAdm/AddProduct";
import { API } from "../config/api"
 
export default function AddProductAdmin(){

    const [image, setImage]=useState(null);
    const [preview,setPreview]=useState(null);

    const [productList, setProductList]=useState([]);

    const [modalSucess, setmodalSucess] = useState(false);
    const handleCloseModalSuccess = () => setmodalSucess(false);
    const handleShowModalSuccess = () => setmodalSucess(true);

    const [notifModal, setNotifModal]=useState('')
    
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
        handleShowModalSuccess();
        setNotifModal("success add product");
        getData();

    }

    const changeFile = e =>{
        let imageFile=e.target.files[0];
        setImage(imageFile)

        let url = URL.createObjectURL(imageFile);
        setPreview(url);
    }

    const getData = async ()=>{
        const response= await API.get('/products');
        setProductList(response.data.data.products);
    }

    useEffect(()=> getData(),[])


    return(
        <Container>
            <Row className='d-flex justify-content-between mb-5'>
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

            <Modal show={modalSucess} size="sm" centered onHide={handleCloseModalSuccess} className='py-5'>
                <Modal.Body className="text-center"> 
                    <h4 className=' mb-4 fw-bold text-soft-red'>{notifModal}</h4>
                    <span className='fw-bold opacity-50 cursor-p modal-next fw-bold cursor-p py-2 px-4 bg-soft-red mb-4' onClick={handleCloseModalSuccess}> ok</span> 
                </Modal.Body>
            </Modal>

            {
                productList.map( data => <ListProduct 
                    reRender={()=>{
                        setNotifModal("success delete product");
                        getData();
                        handleShowModalSuccess();
                    }} 
                    data={data}
                />)
            }
        </Container>
    );
}