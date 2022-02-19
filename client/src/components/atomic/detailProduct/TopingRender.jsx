import React, { useEffect, useState } from 'react';
import { doneStatus } from '../../../containerExport/exportModule';
import { Col, Image } from 'react-bootstrap';
import { topingOrder } from '../../../data/orderDataDumies/topping';
//get data from detailproduct.jsx for show toping
export default function TopingRender( { data, getChange } ){

    const [checkList,setCheckList]=useState(false);

    const eventToogle = () =>{
        setCheckList(prevCheck=>!prevCheck);
        if(!checkList){
            topingOrder.count+=1;
           getChange(2000);
        } else{
            getChange(-2000)
            topingOrder.count-=1;
        }
    }
    useEffect(()=>{
        topingOrder.getState(topingOrder.count+1);
    },[checkList]);

    return(
        <>
            <Col onClick={eventToogle} md={3} className='text-center toping-cnt'>
                {checkList && <Image src={doneStatus} className='done-img'></Image>}
                <Image src={data.image}></Image>
                <p className='text-center'>{data.name}</p>
            </Col>
        </>
    );

}