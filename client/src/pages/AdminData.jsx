import React, { useState } from "react";

import { Container, Table, Image, Modal, Row, Col } from "react-bootstrap";
import { doneStatus, cancelStatus, userImages, Transaction } from '../containerExport/exportModule';

export default function AdminData(){

    const [showStatus, setShowStatus] = useState(false);

    const handleCloseStatus = () => setShowStatus(false);
    const handleShowStatus = (e) => {
        e.preventDefault();
        setShowStatus(true);
    }

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
                <tr className="text-center">
                    <td>No</td>
                    <td>Name</td>
                    <td>Adress</td>
                    <td>Post Code</td>
                    <td className="income">Income</td>
                    <td onClick={handleShowStatus} className="wait-status fw-bold cursor-p">Waiting Approve</td>
                    <td className="text-center py-1">
                        <p className="cancel order-border">Cancel</p>
                        <p className="approve order-border">Approve</p>
                    </td>
                </tr>
                <tr className="text-center">
                    <td>No</td>
                    <td>Name</td>
                    <td>Adress</td>
                    <td>Post Code</td>
                    <td className="income">Income</td>
                    <td className="success-status fw-bold">Success</td>
                    <td className="text-center"><Image src={doneStatus}></Image></td>
                </tr>
                <tr className="text-center">
                    <td>No</td>
                    <td>Name</td>
                    <td>Adress</td>
                    <td>Post Code</td>
                    <td className="income">Income</td>
                    <td className="cancel-status fw-bold">Cancel</td>
                    <td className="text-center"><Image src={cancelStatus}></Image></td>
                </tr>
                <tr className="text-center">
                    <td>No</td>
                    <td>Name</td>
                    <td>Adress</td>
                    <td>Post Code</td>
                    <td className="income">Income</td>
                    <td className="way-status">On The Way</td>
                    <td className="text-center"><Image src={doneStatus}></Image></td>
                </tr>
            </Table>
            <Modal show={showStatus} centered onHide={handleCloseStatus} className='d-flex align-items-center'>
                <Row className='d-flex align-items-center bg-soft-red py-4 px-4 order-border'>
                    <Transaction />
                </Row>
            </Modal>
        </Container>
    );
}