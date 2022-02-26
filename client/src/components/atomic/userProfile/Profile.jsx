import { useContext, useState,useEffect } from "react";
import { Row, Col, Image, Form } from "react-bootstrap";
import { UserContext } from "../../../context/userContextt"
import penImage from "../../../assets/icons/pen.png"
import uploadImage from "../../../assets/icons/upload.png"
import { API } from "../../../config/api";


export default function Profile(){

    const [state, dispatch] = useContext(UserContext)

    const [name, setname]=useState(true);
    const [formName, setFormName]=useState(false);

    const [showData, setShowData]=useState({});

    const handleName = () =>{
        setname(prev => !prev);
        setFormName(prev => !prev)
    }


    const token= localStorage.getItem('token')

    const config = {
        headers: {
            "Authorization": `Bearer ${token}`,//decode token to get id that current login
            "Content-type": "application/json",
        },
    };

    //change name user
    const handleChange = async e =>{
        if(e.which==0x0D){
            if(e.target.value.length<5){
                console.log("name cant be less than 5 character")
                return;
            }
            const value={name: e.target.value}
            const body = JSON.stringify(value);
            const responseAPI=await API.patch('/profile',body,config)
            handleName();
            getData();
        }
    }

    //change imag of user
    const handleImage = async ( e ) => {
        let imageFile=e.target.files[0];

        let url = URL.createObjectURL(imageFile);
        setShowData({...showData, image: url});

        const config = {
            headers: {
                "Authorization": `Bearer ${token}`,//decode token to get id that current login
                "Content-type": "multipart/form-data",
            },
        };

        let formFile= new FormData();
        formFile.set("image", imageFile);
        const response = await API.patch('/profileimage', formFile, config);
        console.log(response);
    }


    const getData = async () => {;
        const responseAPI=await API.get('/profilereload',config);
        const data=responseAPI.data.result;
        setShowData({name: data.name, email: data.email, image: "http://localhost:5000/uploads/"+data.image})
    }
    useEffect( async ()=>{
        getData();
    },[])
    
    return(
        <>
            <Row>
                <Col md={5} className="text-center">
                    <Image className="profile-image" src={showData.image}></Image>
                    <Form.Label for='image' className="mt-4 bg-soft-red px-4 label-profile cursor-p">
                        <span className="mt-2 fw-bold text-label">Change Profile</span>
                        <Image className="icon-profile"src={uploadImage}></Image>
                    </Form.Label>
                    <Form.Control onChange={ handleImage } type="file" name="image" id='image' hidden />
                </Col>
                <Col>
                    <Row className="d-flex align-items-center">
                        <Col>
                            <p class="fw-bold text-soft-red m-0">Full Name</p>
                            { name && <p className="fw-bold">{showData.name}</p> }
                            { formName && 
                                <input onKeyPress={ handleChange } className="input-profile fw-bold text-soft-red" placeholder="type here" type="text" />
                            }
                        </Col>
                        <Col>
                            <Image onClick={ handleName } className="edit-profile cursor-p" src={penImage}></Image>
                        </Col>
                    </Row>
                    
                    <p className="fw-bold text-soft-red m-0">Email</p>
                    <p>{showData.email}</p>
                </Col>
            </Row>
        </>
    );
}