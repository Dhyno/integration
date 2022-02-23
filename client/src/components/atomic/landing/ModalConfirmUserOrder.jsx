import { useContext, useEffect, useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";


export default function ModalConfirmUserOrder(props){
    const [showWarning, setShowWarning] = useState(true);
    const handleCloseShowWarning = () => setShowWarning(false);

    //decative modal and pass count to parenth
    useEffect( ()=> !showWarning && props.deactivemodal() , [showWarning])

    return(
        <>
            <Modal show={showWarning} size="sm" centered onHide={handleCloseShowWarning} className='rounded order-border'>
                <Modal.Body className="text-center"> 
                    <h2 className='text-red py-4 fw-bold'>Please Confirm Your Previous ORder</h2>
                    <span className='modal-next fw-bold cursor-p' onClick={handleCloseShowWarning}>click here</span> 
                </Modal.Body>
            </Modal> 
        </>
    )
}