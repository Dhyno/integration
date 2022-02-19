import React, { useContext, useEffect, useState } from 'react';
import { doneStatus } from '../../../containerExport/exportModule';
import { Col, Image } from 'react-bootstrap';
import { topingOrder } from '../../../data/orderDataDumies/topping';
import { ProductContext } from '../../../context/productContext';
//get data from detailproduct.jsx for show toping
export default function TopingRender( { data, getChange } ){

    const [productState, dispatchProduct] = useContext(ProductContext);

    const [checkList,setCheckList]=useState(false);
    console.log(productState.productPrice);

    const eventToogle = () =>{
        setCheckList(prevCheck=>!prevCheck);
        if(!checkList){
            dispatchProduct({ type: "ADD_TOPPING"})

         } else {
            dispatchProduct({ type: "DELETE_TOPPING"});
         }
           //if topping get checklist increase toping count in gloabal and re render in header else increment
        // else{
        //     getChange(-2000)
        //     topingOrder.count-=1;
        // }
    }



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