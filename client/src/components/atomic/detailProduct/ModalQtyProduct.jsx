import { useContext, useEffect, useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";


export default function ModalQtyProduct(props){
    const [showQty, setShowQty] = useState(true);
    const handleCloseQty = () => setShowQty(false);

    const [count, setCount] = useState(1);
    const increment =() => setCount(count+1)
    const decrement =() => count>1 && setCount(count-1)

    //decative modal and pass count to parenth
    useEffect( ()=> !showQty && props.getQty(count) && props.deactiveModal() , [showQty,count])

    return(
        <>
            <Modal show={showQty} size="sm" centered onHide={handleCloseQty} className='rounded order-border'>
                <Modal.Body className="text-center"> 
                    <h2 className='text-red py-4 fw-bold'>qty</h2>
                    <span onClick={increment}> + </span>
                    <h4> {count} </h4>
                    <span onClick={decrement}> - </span>
                    <h4></h4>
                    <span className='modal-next fw-bold cursor-p' onClick={handleCloseQty}> ok</span> 
                </Modal.Body>
            </Modal> 
        </>
    )
}