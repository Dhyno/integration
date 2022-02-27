import React, { useContext, useEffect, useState } from 'react';
import { doneStatus } from '../../../containerExport/exportModule';
import { Col, Image } from 'react-bootstrap';
import { topingOrder } from '../../../data/orderDataDumies/topping';
import { ProductContext } from '../../../context/productContext';
//get data from detailproduct.jsx for show toping
export default function TopingRender( { data, getChange,keyvalue,price, passId } ){

    const [productState, dispatchProduct] = useContext(ProductContext);

    const [checkList,setCheckList]=useState(false);

    const eventToogle = () =>{
        setCheckList(prevCheck=>!prevCheck);
        if(!checkList){
            dispatchProduct({ type: "ADD_TOPPING"})
            passId(keyvalue,"add_order");
            price(data.price);
        } else {
            dispatchProduct({ type: "DELETE_TOPPING"});
            passId(keyvalue,"delete_order");
            price(-data.price);
        }
    }

    // const storeTopping = () => {
    //     console
    // }

    return(
        <>
            <Col onClick={eventToogle} md={3} className='text-center toping-cnt'>
                {checkList && <Image src={doneStatus} className='done-img'></Image>}
                <Image className="topping-img" src={data.image}></Image>
                <p className='text-center'>{data.name}</p>
            </Col>
        </>
    );

}