import { useState,useEffect } from "react"
import { Image } from "react-bootstrap";
import { API } from '../../../config/api'
import { doneStatus,cancelStatus, userImages, Transaction } from "../../../containerExport/exportModule";


export default function TableData( { transaction,showTransaction, keyValue } ){

    const [status, setStatus]=useState({});
    const initStatus={ cancel: false, onTheWay: false, success: false, waiting: false }

    const sendStatus={};
    const confirmTrans = async ( confirmStatus ) => {
        confirmStatus=="Cancel" && setStatus( { ...initStatus, cancel: true } );
        confirmStatus=="On The Way" && setStatus( { ...initStatus, onTheWay: true } );
        sendStatus.status=confirmStatus;

        const body = JSON.stringify(sendStatus);
        const config = {
            headers: {
            "Content-type": "application/json",
            },
        };
        const response = await API.patch(`/fix_transaction/${transaction.id}`, body, config)
        console.log(response);
        // console.log(transaction.id);
        // console.log(confirmStatus);
    }

    useEffect(()=>{
        // setStatus( {cancel: false, onTheWay: false, success: false, waiting: true} );
        transaction.status=="Waiting Approve" && setStatus({waiting:true});
        transaction.status=="Cancel" && setStatus({cancel:true});
        transaction.status=="On The Way" && setStatus({onTheWay:true});
        // console.log(transaction.status);
    },[])

    return(
        <>
        <tr className="text-center">
            <td>{keyValue}</td>
            <td>{transaction.name}</td>
            <td>{transaction.address}</td>
            <td>{transaction.postCode}</td>
            <td className="income">{transaction.income}</td>

            { status.success && (
                    <>
                        <td className="success-status fw-bold">Success</td>
                        <td className="text-center"><Image src={doneStatus}></Image></td>
                    </>
                )
            }

            { status.cancel && (
                    <>
                        <td className="cancel-status fw-bold">Cancel</td> 
                        <td className="text-center"><Image src={cancelStatus}></Image></td>
                    </>
                )
            }
            
            { status.onTheWay &&(
                    <>
                        <td className="way-status">On The Way</td>
                        <td className="text-center"><Image src={doneStatus}></Image></td>
                    </>
                )
            }

            { status.waiting && (
                <>
                    <td onClick={ ()=>showTransaction(keyValue-1) } className="wait-status fw-bold cursor-p">Waiting Approve</td>
                    <td className="text-center py-1">
                        <p onClick={ ()=> confirmTrans("Cancel") }  className="cancel order-border cursor-p">Cancel</p>
                        <p onClick={ ()=> confirmTrans("On The Way") } className="approve order-border cursor-p">Approve</p>
                    </td>
                </>
            )
                
            }
        </tr>
        </>
    )
}