import { useContext, useEffect, useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export default function ModalConfirmUserOrder(props){

    const navigate=useNavigate();

    const [showWarning, setShowWarning] = useState(true);
    const handleCloseShowWarning = () => {
        setShowWarning(false);
        return navigate(`/detailproduct/${props.idProduct}`)//navigate to detailproduct and close modal
    }

    return(
        <>
            <Modal show={showWarning} size="sm" centered onHide={handleCloseShowWarning}>
                <Modal.Body className="text-center"> 
                    <h5 className='py-4 fw-bold opacity-75 text-soft-red'>Product will add to your previous order</h5>
                    <span className='modal-next fw-bold cursor-p py-2 px-4 bg-soft-red' onClick={handleCloseShowWarning}>Okay</span> 
                </Modal.Body>
            </Modal> 
        </>
    )
}