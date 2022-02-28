import { Row, Col, Image } from "react-bootstrap";
import { popImage } from '../atomic/getAllImages/GetImages'

import { useNavigate } from "react-router-dom";
import { useState,useContext,useEffect } from "react";

import { dataLogin } from "../../data/orderDataDumies/dataLogin";
import { UserContext } from "../../context/userContextt";
import { ProductContext } from "../../context/productContext";

//true in prop deactive for logout
export default function PopData(props){

    const [state, dispatch] = useContext(UserContext);//get is admin or customer
    const [productState, dispatchProduct] = useContext(ProductContext)
    const [isAdmin,setisAdmin]=useState(false);
    const [isDelivery,setisDelivery]=useState(false);

    useEffect( ()=> {
        state.user.rule=="ADMIN" ? setisAdmin(true) : setisAdmin(false)
        state.user.rule=="DELIVERY" && setisDelivery(true);
    }, [] )//to get is admin or no when first load if is admin show component admin and if user show comoponent user

    const navigate=useNavigate();

    const redirectPage = ( page, isLogout ) => {
        navigate(`${page}`); 
        props.deactivepop()//toogle pop in header 
        if(isLogout=="logout"){
            dispatch({ type: "LOGOUT"})  //if logout true set context LOGOUT in usercontext global use conditional operator(dispatch is true)
            dispatchProduct({type: "DELETE_ORDER"})//delete sign that order is false 
        }
    }

    return(
        <div>{ 

            !isAdmin ?<>
                <Row className="py-4 px-2 mb-2 border-bottom border-2">
                    <Col md={4}><Image src={popImage.profileIcon}></Image></Col>
                    { isDelivery ?
                        <Col md={8}><h2 onClick={ ()=> redirectPage("/delivery") } className="cursor-p">Dashboard</h2></Col>
                        :
                        <Col md={8}><h2 onClick={ ()=> redirectPage("/user") } className="cursor-p">Profile</h2></Col>
                    }
                </Row>
                <Row className='pt-4 px-2 pb-2 mb-2'>
                    <Col md={4}><Image src={popImage.logOutIcon}></Image></Col>
                    <Col md={8} onClick={ ()=> redirectPage("/","logout")  } className="cursor-p" ><h2>Logout</h2></Col>
                </Row></>

            : <>
            <Row className="py-2 mb-2 d-flex align-items-center border-bottom border-2">
                <Col md={3}><Image className="pop-img" src={popImage.addProduct}></Image></Col>
                <Col md={9}><h5 onClick={ ()=> redirectPage("/addproduct") } className="cursor-p">Add Product</h5></Col>
            </Row>
            <Row className="py-2 mb-2 border-bottom border-2">
                <Col md={3}><Image className="pop-img" src={popImage.addToping}></Image></Col>
                <Col md={9}><h5 onClick={ ()=> redirectPage("/addtopping") } className="cursor-p">Add Toping</h5></Col>
            </Row>
            <Row className="py-2 mb-2 border-bottom border-2">
                <Col md={3}><Image className="pop-img" src={popImage.transaction}></Image></Col>
                <Col md={9}><h5 onClick={ ()=> redirectPage("/admindata") } className="cursor-p">Transaction</h5></Col>
            </Row>
            <Row className='px-2'>
                <Col md={3}><Image className="pop-img" src={popImage.logOutIcon}></Image></Col>
                <Col md={9} onClick={ ()=> redirectPage("/","logout") } className="cursor-p" ><h5>Logout</h5></Col>
            </Row> </>}
            
        </div>
    );
}