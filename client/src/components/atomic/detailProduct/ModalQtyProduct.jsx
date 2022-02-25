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
            <Modal show={showQty} size="sm" centered onHide={handleCloseQty} className='py-5'>
                <Modal.Body className="text-center"> 
                    <h2 className=' mb-4 fw-bold opacity-50 text-soft-red'>Quantity</h2>
                    <button className="qty bg-purple-soft" onClick={increment}> + </button>
                    <span className="fw-bold fs-2 "> {count} </span>
                    <button className="qty bg-red-soft" onClick={decrement}> - </button>
                    <h4 className="mb-5"></h4>
                    <span className='fw-bold opacity-50 cursor-p modal-next fw-bold cursor-p py-2 px-4 bg-soft-red mb-4' onClick={handleCloseQty}> ok</span> 
                </Modal.Body>
            </Modal> 
        </>
    )
}