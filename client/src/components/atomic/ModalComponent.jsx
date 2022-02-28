import { useContext, useEffect, useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { API } from "../../config/api";
import { UserContext } from "../../context/userContextt";
import { Navigate, useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/productContext";


export default function ModalComponent(props){

    //TO DELETE///////////////////////////////////////
    const conditional={loginModal:false,registerModal:false};
    props.getLoginModal ? conditional.loginModal=true : conditional.registerModal=true;
    //TO DELETE/////////////////////////////////////////////////////

    const navigate=useNavigate();

    const [state, dispatch] = useContext(UserContext);
    const [productState, dispatchProduct] = useContext(ProductContext);

    const [showRegister, setShowRegister] = useState(conditional.registerModal );
    const handleShowRegister = () => setShowRegister(true);
    const handleCloseRegister = () => setShowRegister(false);

    const [showLogin, setShowLogin] = useState(conditional.loginModal);
    const handleShowLogin = () => setShowLogin(true);
    const handleCloseLogin = () => setShowLogin(false);

    //if both of modal is false or dont submit login and register then close modal and back to header
    useEffect(()=>(!showRegister && !showLogin) && props.deactivemodal(),[showRegister,showLogin])

    let formLogin={}
    const loginSubmit = async e => {
        try{
            e.preventDefault();

            formLogin.email=e.target.email.value;
            formLogin.password=e.target.password.value;

            const body = JSON.stringify(formLogin);
            const config = {
                headers: {
                "Content-type": "application/json",
                },
            };

            const response = await API.post("/login", body, config);

            if(response.status==200){
                handleCloseLogin();
                handleCloseRegister();
                props.deactivemodal();
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: response.data.data,
                });
            }
            const ruleAdmin=response.data.data.rule;
            
            if(ruleAdmin=="ADMIN"){
                return navigate('/admindata')

            } else if(ruleAdmin=="DELIVERY"){
                return navigate('/delivery')

            } else if(ruleAdmin=="USER"){//if rule as user then check if user have order before if order exist user must confirm it and blocked to order till confirm previous order
                const token= localStorage.getItem('token')
                const config = {
                    headers: {
                    "Authorization": `Bearer ${token}`,//decode token to get id that current login
                    },
                };
                const response=await API.get('/transactionbytoken',config);//check if user have order before user must confirm it
                console.log(response);
                let result=response.data.result;
                for(let i=0; i<result.length; i++){
                    if(result[i].status=="tentative"){
                        console.log("caught in modal id Transaction is: "+result[i].idTransaction);
                        const idTransaction=result[i].idTransaction;
                        dispatchProduct({type: "ADD_ORDER", payload: idTransaction })//set id order that hvnt confirm to global context
                        return;
                    }
                }
            }
            
        } catch(error){
            console.log(error);
        }
    }

    const formRegister={};
    const registerSubmit = async (e) => {
        try{
            e.preventDefault();
            formRegister.email=e.target.email.value;
            formRegister.password=e.target.password.value;
            formRegister.name=e.target.name.value;
            formRegister.rule="USER";

            const body = JSON.stringify(formRegister);
            const config = {
                headers: {
                "Content-type": "application/json",
                },
            };

            const response = await API.post("/register", body, config);
            if(response.status==200){
                handleCloseLogin();
                handleCloseRegister();
                props.deactivemodal();
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: response.data.data,
                });
            }


        } catch(error){
            console.log(error)
        }

    }

    return(
        <>
            <Modal show={showRegister} centered onHide={handleCloseRegister} className='rounded order-border'>
                <Modal.Body> 
                    <h2 className='text-red py-4 fw-bold'>Register</h2>   
                    <Form onSubmit={(e)=>registerSubmit(e)}>
                        <Form.Control type="email" name="email" className='mb-4 py-2 bg-soft b-red border-2' placeholder="Email" />
                        <Form.Control type="password" name="password" className='mb-4 py-2 bg-soft b-red border-2' placeholder="Password" />
                        <Form.Control type="text" name="name" className='mb-4 py-2 bg-soft b-red border-2' placeholder="Full Name" />
                        <Button type="submit" className='bg-red mb-2 text-light b-red w-100 py-2 fw-bold'>Register</Button>
                    </Form> 
                    <p className='fw-bold text-center'>Already have an account ? Klik
                        <span className='fw-bold cursor-p' onClick={ ()=>{ handleCloseRegister(); handleShowLogin(); }}> Here</span> 
                    </p>
                </Modal.Body>
            </Modal> 
            <Modal show={showLogin} centered onHide={handleCloseLogin} className='rounded order-border'>
                <Modal.Body> 
                    <h2 className='text-red py-4 fw-bold'>Login</h2>   
                    <Form onSubmit={ (e)=>loginSubmit(e) }>
                        <Form.Control type="email" name="email" className='mb-4 py-2 bg-soft b-red border-2' placeholder="Email" />
                        <Form.Control type="password" name="password" className='mb-4 py-2 bg-soft b-red border-2' placeholder="Password" />
                        <Button type="submit" className='bg-red mb-2 text-light b-red w-100 py-2 fw-bold'> Login </Button>
                    </Form>
                    <p className='fw-bold text-center'>Dont have an account ? Klik
                        <span className='fw-bold cursor-p' onClick={()=>{handleCloseLogin(); handleShowRegister(); }}> Here</span> 
                    </p>
                </Modal.Body>
            </Modal>
        </>
    );
}