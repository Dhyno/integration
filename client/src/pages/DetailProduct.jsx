import { useEffect } from 'react';
import { API } from '../config/api';
import { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductContext } from '../context/productContext';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { TopingRender, productList, productHero, topingData } from '../containerExport/exportModule';
import ModalQtyProduct from '../components/atomic/detailProduct/ModalQtyProduct';

export default function DetailProduct(){
    const id=useParams().id;
    const navigate=useNavigate();

    const [productState, dispatchProduct] = useContext(ProductContext);

    const [toppings,setToppings]=useState([]);
    const [productDetail,setProductDetail]=useState({});

    const [total, setTotal]=useState(0);
    const [toppingOrder, setToppingOrder]=useState([]);

    const getToppingId = ( idTopping, action ) => {
        if(action=="add_order"){
            setToppingOrder([...toppingOrder,idTopping])
        } else if(action=="delete_order"){
            let tempValue=[...toppingOrder];
            tempValue=tempValue.filter( id => id!=idTopping);
            setToppingOrder(tempValue);
        }
        
    }

    //set data when first loading page
    const getData = async () =>{

        const responseAPI=await API.get(`/product/${id}`)
        setProductDetail(responseAPI.data.data.product);
        setTotal(responseAPI.data.data.product.price);

        const toppingresponse=await API.get('/toppings')
        setToppings(toppingresponse.data.data.toppings)
    }
    useEffect(()=>{
        getData();
        // console.log(productState.idTransaction);
        return () =>dispatchProduct({type: "RESET_TOPPING"})
    },[])


    const [modal, setModal]=useState(false);
    const handleShowModal=()=> setModal( prev => !prev);//goal modal to get qty to order

    const addOrder = async (qty) =>{
        //prepare data product and topping to send to server match with endpoint in server
        let productOrder={
            id: id,
            qty: qty,
            topping: toppingOrder
        }

        const token= localStorage.getItem('token')

        const config = {
            headers: {
              "Authorization": `Bearer ${token}`,//decode token to get id that current login
              "Content-type": "application/json",
            },
          };

        if(productState.haveOrder){ //if user have order but add product again in same order
            console.log("already order idtransaction: "+ productState.idTransaction);
            let dataToOrder={
                idTransaction: productState.idTransaction,
                product: productOrder
            }
            // console.log(dataToOrder);
            const body = JSON.stringify(dataToOrder);
            const responseAPI=await API.post(`/addOneProductTransaction`,body,config);
            // console.log(responseAPI);

        } else {
            console.log("no yet order: "+ productState.idTransaction);
            let listProductOrder=[productOrder];

            const dataToOrder={
                product: listProductOrder
            }
            
            const body = JSON.stringify(dataToOrder);

            const responseAPI=await API.post(`/transaction`,body,config);
            // console.log(responseAPI)
            const idTransaction=responseAPI.data.transaction.id;
            dispatchProduct({type: "ADD_ORDER", payload: idTransaction })//give sign that current user have order and next order is add one product to transaction/order
        }
        return navigate('/userchart');
    }


    return(
        <Container>
            <Row>
                <Col md={6}>
                    <Image className='img-fluid product-detail-hero' src={productDetail.image}></Image>
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <h1 className="text-red">{productDetail.name}</h1>
                            <p className="mb-5 fs-4 text-soft-red">{productDetail.price}</p>
                            <h5 className="mb-5 fw-bold fs-4 text-soft-red">Toping</h5>
                        </Col>
                        <Row className='mb-5'>
                            { toppings.map( ( data ) => <TopingRender 
                                price={(val)=> setTotal(total+val)} 
                                passId={(id,action)=> getToppingId(id, action)}
                                data={data} 
                                keyvalue={data.id}/> 
                            ) }
                        </Row>
                    </Row>
                    <Row>
                        <Col>
                            <h5 className="fw-bold fs-4 text-soft-red">Total</h5>
                        </Col>
                        <Col className='text-end'>
                            <h5 className="fw-bold fs-4 text-soft-red">{total}</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            {/* <Button onClick={()=>navigate('/userchart')} className="btn btn-danger w-100 my-5 bg-red">Add Chart</Button> */}
                            <Button onClick={handleShowModal} className="btn btn-danger w-100 my-5 bg-red">Add Chart</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            
            {modal && <ModalQtyProduct 
                deactiveModal={ ()=>handleShowModal()}
                getQty={(qty)=>addOrder(qty)}
            />}

        </Container>
    )
}

// format toe ndpoint
// {
//     "user": 6,
//     "product":[
//         {
//             "id": 7,
//             "qty": 2,
//             "topping": [10,15]
//         },
//         {
//             "id": 10,
//             "qty": 10,
//             "topping": [12,14]
//         }
//     ]
// }

// {
//     "idTransaction": 36,
//     "product":
//         {
//             "id": 10,
//             "qty": 2,
//             "topping": [10,15]
//         }
// }