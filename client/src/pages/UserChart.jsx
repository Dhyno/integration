import React,{useContext, useEffect, useState} from "react";
import { Container, Row, Col, Image, Button,Form, Modal } from "react-bootstrap";
import { UserTotalChartRender, FormUserChart, TotalPrice, userChartOrder } from '../containerExport/exportModule'
import { useNavigate } from "react-router-dom";
import { dataLogin } from "../data/orderDataDumies/dataLogin";
import { API } from "../config/api";
import { ProductContext } from "../context/productContext";

export default function UserChart(){

    const navigate=useNavigate();

    const [productState, dispatchProduct] = useContext(ProductContext)

    const [showProcess, setShowProcess] = useState(false);
    const [product, setProduct]=useState([]);//for all img and props from api to render in UserTotalChartRender
    const [totalProduct,setTotalProduct]=useState([]);//for total product in eacth componen UserTotalChartRender
    const [allTotal,setAllTotal]=useState({});//for total price component
    const [attachment, setAttachment]=useState(null);

    //for modal
    const handleCloseProcess = () =>{
        setShowProcess(false);
        // navigate('/');
    }
    const handleShowProcess = (e) => {
        e.preventDefault();
        console.log(e.target.name.value);
        console.log(e.target.email.value);
        console.log(e.target.phone.value);
        console.log(e.target.postCode.value);
        console.log(e.target.adress.value);
        console.log(attachment);
        setShowProcess(true);
    }  

    const confirmDeleteProduct = async id => {
        const response=await API.delete(`/delOneProductTransactionById/${id}`);//delete product id in productorder table
        console.log(response);
        getData();//re render page
    }

    const getData = async () => {
        try{
            const idTransaction=productState.idTransaction
            const responseAPI= await API.get(`/transaction/${idTransaction}`)
            console.log(responseAPI);
            let getProduct=responseAPI.data.resultToSend.order;
            setProduct(getProduct);

            //get total price with c style 
            let totalPriceProduct=[];
            let totalPriceAll=0;
            //tcode with c ways
            for(let i=0; i<getProduct.length;i++){
                let total=getProduct[i].price;
                for(let j=0; j<getProduct[i].toppings.length; j++){
                    total+=getProduct[i].toppings[j].price;
                }
                totalPriceProduct.push(total);
            }
            setTotalProduct(totalPriceProduct);
            for(let i=0; i<totalPriceProduct.length; i++){
                totalPriceAll=totalPriceAll+totalPriceProduct[i];
            }
            setAllTotal({...allTotal,
                totalPrice:totalPriceAll,
                qty: getProduct.length
            });

        } catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        console.log("in userchar: "+productState.idTransaction)
        getData();
    },[])
    
    return(
        <Container className='text-red'>
            <h2>My Chart</h2>
            <h5 className='pb-2'>Review Your Order</h5>
            <Row className='d-flex justify-content-between'>
                <Col md={7} className='border-top b-red'>
                    { product.map( ( data,indeks )  => <UserTotalChartRender 
                        getKeyId={(id)=>confirmDeleteProduct(id)}
                        total={totalProduct[indeks]} 
                        data={ data }/> ) 
                    }
                    <TotalPrice getImage = { image=>setAttachment(image) } data={allTotal} />
                </Col>
                <Col md={4}>
                    <Form onSubmit={(e)=>handleShowProcess(e)}>
                        <FormUserChart />
                        <Button type='submit' className='bg-red text-light fw-bold w-100'>Pay</Button>
                    </Form>
                </Col>
            </Row>

            <Modal show={showProcess} centered onHide={handleCloseProcess} className='d-flex align-items-center'>
                <Modal.Body><p className='text-center pt-4 pb-2 text-order px-2'>Thank you for ordering in us, please wait to verify you order</p></Modal.Body>
            </Modal>
        </Container>
    );
}