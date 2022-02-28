import { Row, Col, Image } from "react-bootstrap";

import { doneStatus,cancelStatus, userImages, Transaction } from "../../../containerExport/exportModule";
import pendingImage from '../../../assets/icons/pending.png';

export default function TableDataDelivery( { data } ){

    const test = (key) =>{
        console.log(key)
    }

    return(
        <Col md={12}>
            <table cellpadding="10" class="w-100">
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Adress</th>
                    <th>Date</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th class="text-center">Action</th>
                </tr>

                {
                    data.map( ( getData, i ) => {
                        return(
                            <tr class="tb-order text-secondary">
                                <td>{ i+1 }</td>
                                <td className="text-dark fw-bold">
                                    <Image className="tb-user-image" src={getData.customer.image}></Image>
                                    {getData.fix_transaction.name}
                                </td>
                                <td>{getData.fix_transaction.adress}</td>
                                <td>{getData.fix_transaction.postCode}</td>
                                <td className="income">{getData.fix_transaction.total}</td>
                                <td className="fw-bold way-status">{getData.fix_transaction.status}</td>
                                <td className="text-center">
                                    <Image onClick={()=>test(i)} className="status-del-img mx-2 cursor-p" src={pendingImage}></Image>
                                    <Image className="status-del-img mx-2 cursor-p" src={doneStatus}></Image>
                                </td>
                            </tr>
                        )
                    })
                }

                {/* <tr class="tb-order text-secondary">
                    <td>1</td>
                    <td className="text-dark fw-bold"><Image className="tb-user-image" src={defaultUser}></Image>sebastian</td>
                    <td>Adress</td>
                    <td>Post Code</td>
                    <td class="income">28000</td>
                    <td class="wait-status fw-bold text-danger">Pending</td>
                    <td class="text-center"><Image className="status-del-img" src={pendingImage}></Image></td>
                </tr>
                <tr class="tb-order text-secondary">
                    <td>2</td>
                    <td className="text-dark fw-bold" ><Image className="tb-user-image" src={defaultUser}></Image>Dhyno</td>
                    <td>Adress</td>
                    <td>Post Code</td>
                    <td class="income">30000</td>
                    <td class="success-status fw-bold text-success">Success</td>
                </tr> */}
            </table>
        </Col>
    )
}