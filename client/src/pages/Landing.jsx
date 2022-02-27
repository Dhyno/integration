import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContextt';
import { useState, useContext, useEffect } from 'react';
import { ProductContext } from '../context/productContext';

import {Container, Row, Col } from 'react-bootstrap';

import { API } from '../config/api';
import ServerError from '../components/emptyPage/ServerError';
import ModalComponent from '../components/atomic/ModalComponent';
import UnauthorizedAdmin from '../components/emptyPage/UnauthorizedAdmin';
import ModalConfirmUserOrder from '../components/atomic/landing/ModalConfirmUserOrder';

import { landingImages, productList, OrderList} from '../containerExport/exportModule';

export default function Landing(){

    const navigate=useNavigate();

    const [state, dispatch] = useContext(UserContext)//get is userlogin or false to condition toogle if it show or no
    const [productState, dispatchProduct] = useContext(ProductContext)//to check if user have order before then blok him/her
                                                                    //till user confirm it
    const [showModal, setModal] = useState(false);
    const [modalLogin, setModalLogin] = useState(false);//pass to props to get modal is login or register
    const resetModalLogin = () => setModalLogin( prevModalLogin => !prevModalLogin);
    const handleModal = () => state.isLogin ? setModal(false) : setModal(prevShow => !prevShow);//if login true always set modal to false
    
    const [product,setProduct]=useState([])
    
    const [showWarning,setShowWarning]=useState( { modal: false, idProduct: null});//modal show to user he/she have already order before

    const [unauthorized, setUnauthorized]=useState(false);//if admin make order block him/her
    const [serverError, setServerError]= useState(false)//if server get truble

    const getClickKey =  keyval => {
        if(state.isLogin){
            if(state.user.rule != 'USER'){
                return setUnauthorized(true);
            }
            if(productState.haveOrder){
                return setShowWarning({idProduct: keyval,modal: true});//show modal warning and pass idproduct to it and in modal navigate to detail product that have pass to it
            } else{
                navigate(`/detailproduct/${keyval}`)
            }

        }
    }//if login true then navigate to detail product page
    
    //get data product from api when first load
    useEffect(async ()=>{
        try{
            const response=await API.get('/products');
            setProduct(response.data.data.products);
        } catch(error){
            setServerError(true)
        }
        
    },[])

    return(
        <Container className='py-5'>
            {serverError ? <ServerError />
                :
                <>
                    {unauthorized ? <UnauthorizedAdmin deactive={()=>setUnauthorized(false)}/>
                        :
                        <>
                            <Row className='mb-5'>
                                <Col xs lg={10}>
                                    <div class="jumbotron jumbotron-md bg-red py-5 px-4 d-flex align-items-center order-border">
                                        <div class="container text-light px-5">
                                            <h1 class="display-5 fw-bold">WAYSBUCKS</h1>
                                            <p class="lead">Things are changing, but we re still here for you</p>
                                            <p className='w-50 opacity-50'>We have temporarily closed our in-store cafes, but select grocery and drive-thru locations remaining open.
                                                <span className='fw-bold opacity-100'>Waysbuck</span>
                                                 Drivers is also available
                                            </p>
                                            <p>Let s Order...</p>
                                        </div>
                                        <img src={landingImages.mainLandingImg} className='main-landing-img'></img>
                                    </div>
                                </Col>
                            </Row>
                            <Row className='text-red mb-5'>
                                <h1>Lets Order</h1>
                            </Row>
                            <Row>
                                { product.map((data)=>{
                                    return(
                                        <Col md={3} className='cursor-p mb-5' onClick={handleModal} >
                                            <OrderList getclickkey={(keyval)=> getClickKey(keyval)} keyvalue={data.id} dataProduct={data} />
                                        </Col> 
                                    );
                                    }
                                )}
                            </Row>
                        </>
                    }
                </>
            }

            {showModal && <ModalComponent 
                deactivemodal={()=>{    
                    resetModalLogin();
                    handleModal();
                }}
            />}

            { showWarning.modal && <ModalConfirmUserOrder idProduct= { showWarning.idProduct }/> }

        </Container>
    );
}