import { useContext, useState } from "react";
import { Container, Row, Col, Image, Form } from "react-bootstrap";
import { UserContext } from "../../../context/userContextt"
import { userImages } from "../getAllImages/GetImages";
import penImage from "../../../assets/icons/pen.png"
import { API } from "../../../config/api";


export default function Profile(){

    const [state, dispatch] = useContext(UserContext)
    const [name, setname]=useState(true);
    const [formName, setFormName]=useState(true);

    const handleName = () =>{
        setname(prev => !prev);
    }

    const handleChange = async e =>{
        if(e.which==0x0D){

            const token= localStorage.getItem('token')
            console.log(token)
            const config = {
                headers: {
                "Authorization": `Bearer ${token}`,//decode token to get id that current login
                },
            };
            // console.log(e.target.value)
            const response= await API.post(`/profile`,config);
            console.log(response);
        }
    }
    
    return(
        <>
            <Row>
                <Col md={5}>
                    <Image className="profile-image" src={state.user.image}></Image>
                </Col>
                <Col>
                    <Row className="d-flex align-items-center">
                        <Col>
                            <p class="fw-bold text-soft-red m-0">Full Name</p>
                            { name && <p className="fw-bold">{state.user.name}</p> }
                            { formName && 
                                <input onKeyPress={ handleChange } className="input-profile" type="text" />
                            }
                        </Col>
                        <Col>
                            <Image onClick={ handleName } className="edit-profile cursor-p" src={penImage}></Image>
                        </Col>
                    </Row>
                    
                    <p className="fw-bold text-soft-red m-0">Email</p>
                    <p>{state.user.email}</p>
                </Col>
            </Row>
        </>
    );
}