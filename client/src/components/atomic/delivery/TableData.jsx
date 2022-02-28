import { useState,useEffect } from "react";
import { Row, Col, Image, Modal,Form } from "react-bootstrap";

import { doneStatus,cancelStatus, userImages, Transaction } from "../../../containerExport/exportModule";
import pendingImage from '../../../assets/icons/pending.png';
import { API } from "../../../config/api";

export default function TableDataDelivery( { data } ){
    
    const { customer, fix_transaction }=data;
    // console.log(fix_transaction);

    const [showMessage, setShowMessage] = useState(false);
    const handleCloseMessage = () => setShowMessage(false);
    const handleShowMessage = () => setShowMessage(true);

    const [status, setStatus]=useState({});
    const [statusSend, setStatusSend] = useState('');
    const initStatus={ pending: false, success: false, ontheway:false, showPendingImg: true }

    const getStatus =  ( confirmStatus ) => {
        confirmStatus=="Pending" && setStatus( { ...initStatus, pending: true,showPendingImg:true } );
        confirmStatus=="Success" && setStatus( { ...initStatus, success: true, showPendingImg: false } );
        setStatusSend(confirmStatus);
        handleShowMessage();
    }

    const confirmStatus = async e => {
        e.preventDefault();
        handleCloseMessage();

        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        let dataComment={
            message: e.target.message.value
        }

        let body = JSON.stringify(dataComment);

        const response= await API.patch(`/ratestatus/${fix_transaction.id}`,body, config);
        console.log(response);

        let sendstatus={
            status: statusSend
        }
        body = JSON.stringify(sendstatus);
        const responseAPI= await API.patch(`/fix_transaction/${fix_transaction.id}`,body, config)
        console.log(responseAPI);
        // dataToSend.

        // console.log(e.target.message.value);
        // console.log(statusSend);
        console.log(fix_transaction);
    }
    
    useEffect(()=>{
        console.log("here");
        fix_transaction.status=="Pending" && setStatus({pending:true, showPendingImg: true});
        fix_transaction.status=="Success" && setStatus({success:true, showPendingImg: false});
        fix_transaction.status=="On The Way" && setStatus({ontheway:true, showPendingImg: true})
    },[])

    return(
        <>
        <tr class="tb-order text-secondary">
            <td>1</td>
            <td className="text-dark fw-bold">
                <Image className="tb-user-image" src={customer.image}></Image>
                {fix_transaction.name}
            </td>
            <td>{fix_transaction.adress}</td>
            <td>{fix_transaction.postCode}</td>
            <td class="income">{fix_transaction.total}</td>

            { status.ontheway && <td class="fw-bold way-status">On The Way</td>}

            { status.pending && <td class="fw-bold text-danger">Pending</td>}

            { status.success &&  <td class="success-status fw-bold text-success">Success</td> }

            <td class="text-center">
                { status.showPendingImg &&
                    <Image onClick={()=>getStatus('Pending')} className="status-del-img mx-2 cursor-p" src={pendingImage}></Image>
                }
                <Image onClick={()=>getStatus('Success')} className="status-del-img mx-2 cursor-p" src={doneStatus}></Image>
            </td>
        </tr>
        
        
        <Modal show={showMessage} size="md" centered onHide={handleCloseMessage} className='py-2'>
            <Modal.Body className="text-end"> 
                <Form onSubmit={confirmStatus}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control name="message" as="textarea" className='bg-orange' rows={5} placeholder="sen message to customer" />
                        <button type="submit" class="admin-send fw-bold my-2">Send</button>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal> 


        </>
    )
}