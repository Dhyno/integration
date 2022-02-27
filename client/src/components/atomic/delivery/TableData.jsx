import { Row, Col, Image } from "react-bootstrap";
import defaultUser from '../../../assets/images/user/default-user.png'
import pendingImage from '../../../assets/icons/pending.png';

export default function TableDataDelivery(){

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
                <tr class="tb-order text-secondary">
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
                </tr>
            </table>
        </Col>
    )
}