import React, { useState, useEffect } from "react";

import { API } from '../config/api'

import { Container, Table, Image, Modal, Row, Col } from "react-bootstrap";
import { doneStatus, cancelStatus, userImages, Transaction } from '../containerExport/exportModule';
import TableData from "../components/atomic/adminData/TableData";
import DetailTransaction from "../components/atomic/adminData/DetailTransaction";
import { useNavigate } from "react-router-dom";

export default function AdminData(){

    const navigate=useNavigate();

    const [transaction, setTransaction]=useState([]);
    const [transactionModal, setTransactionModal]=useState({})
    
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = indeks => {
        setTransactionModal(transaction[indeks]);
        setShowModal(true);
    }

    const getData =async () =>{
        try{

            const response=await API('/fix_transactions');
            setTransaction(response.data.resultToSend);
            // console.log(response.data.resultToSend);

        } catch(error){
            console.log(error);
        }

    }

    useEffect(()=>{
        getData();
    },[])

    return(
        <Container className='my-5'>
            <h2 className='text-red mb-5 fw-bold'>Income Transaction</h2>
            <Table>
                <tr className="text-center tr">
                    <th className="th" >No</th>
                    <th className="th">Name</th>
                    <th className="th">Adress</th>
                    <th className="th">Post Code</th>
                    <th className="th">Income</th>
                    <th className="th">Status Code</th>
                    <th className="th">Action</th>
                </tr>

                {
                    transaction.map( ( data, i ) => <TableData 
                        keyValue={i+1} 
                        transaction={data}
                        showTransaction={ indeks => handleShowModal(indeks) }
                     />)
                }
            </Table>
            <Row className="text-center">
                <h4 className="fw-bold text-soft-red my-4">See Customer Complaint About Product</h4>
                <Col>
                    <button onClick={()=>navigate('/delivery')} class="admin-send fw-bold my-2">Go Now</button>
                </Col>
            </Row>
            <Modal show={showModal} centered onHide={handleCloseModal} className='d-flex align-items-center'>
                <Row className='d-flex align-items-center bg-soft-red py-4 px-4 order-border'>
                    <DetailTransaction data={transactionModal}/>
                </Row>
            </Modal>
        </Container>
    );
}