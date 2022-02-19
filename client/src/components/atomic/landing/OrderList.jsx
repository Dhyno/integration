import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Form, Button } from 'react-bootstrap';
import { dataLogin } from '../../../data/orderDataDumies/dataLogin';

//destructuring props from data object uknown name in landing.jsx
export default function OrderList( { dataProduct, keyvalue, getclickkey } ){

  //pass key to parent to get key to pass in params
  const  getNavigate = getkey=> getclickkey(getkey);
  
  return(
    <>
      <div keyvalue={keyvalue} onClick={()=>getNavigate(keyvalue)} className='text-red bg-soft-red order-border'>
        <img src={dataProduct.image} className='w-100'></img>
        <div className='px-4 py-2'>
            <h5 className='fw-bold'>{dataProduct.name}</h5>
            <h6 className='text-soft-red'>Rp.{dataProduct.price}</h6>
        </div>
      </div>
    </>  
  );
}