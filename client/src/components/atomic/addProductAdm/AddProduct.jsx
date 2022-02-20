
import { Form, Button, Image } from "react-bootstrap";
import fileIcon from '../../../assets/icons/file.svg';
import productImage from '../../../assets/images/largeImages/product-hero.svg'

export default function AddProduct({ isChange }){
    return(
        <>
            <Form.Group className="mb-5" controlId="exampleForm.ControlInput1">
                <Form.Control type="text" name="productname" className='border-2 b-red bg-soft-red' placeholder="Prodcut Name" />
            </Form.Group>
            <Form.Group className="mb-5" controlId="exampleForm.ControlInput1">
                <Form.Control type="number" name="price" className='border-2 b-red bg-soft-red' placeholder="Price" />
            </Form.Group>
            <Form.Group  className="mb-5 w-100 bg-soft-red border border-2 b-red px-2 d-flex justify-content-between align-items-center" controlId="exampleForm.ControlInput1">
                <p className='text-secondary'>Photo Product</p>
                <Form.Label for='picture'>
                    <Image src={fileIcon}></Image>
                </Form.Label>
                <Form.Control onChange={e => isChange(e)} type="file" name="image" id='picture' className='border-2 b-red bg-soft-red' placeholder="Photo Product" hidden />
            </Form.Group>
        </>
    );
}