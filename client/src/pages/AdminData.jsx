import React, { useState, useEffect } from "react";

import { API } from '../config/api'

import { Container, Table, Image, Modal, Row, Col } from "react-bootstrap";
import { doneStatus, cancelStatus, userImages, Transaction } from '../containerExport/exportModule';
import TableData from "../components/atomic/adminData/TableData";

export default function AdminData(){

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
                <tr className="text-center">
                    <th>No</th>
                    <th>Name</th>
                    <th>Adress</th>
                    <th>Post Code</th>
                    <th>Income</th>
                    <th>Status Code</th>
                    <th>Action</th>
                </tr>

                {
                    transaction.map( ( data, i ) => <TableData 
                        keyValue={i+1} 
                        transaction={data}
                        showTransaction={ indeks => handleShowModal(indeks) }
                     />)
                }
            </Table>
            <Modal show={showModal} centered onHide={handleCloseModal} className='d-flex align-items-center'>
                <Row className='d-flex align-items-center bg-soft-red py-4 px-4 order-border'>
                    <Transaction data={transactionModal}/>
                </Row>
            </Modal>
        </Container>
    );
}