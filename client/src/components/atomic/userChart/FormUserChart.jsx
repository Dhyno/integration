
import { Form } from "react-bootstrap";

export default function FormUserChart(){
    return(
        <>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control type="text" name="name" className='b-red bg-soft-red' placeholder="Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control type="email" name="email" className='b-red bg-soft-red' placeholder="Email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control type="phone" name="phone" className='b-red bg-soft-red' placeholder="Phone" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control type="number" name="postCode" className='b-red bg-soft-red' placeholder="Post Code" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control as="textarea" name="adress" className='b-red bg-soft-red' rows={5} placeholder="Adress" />
            </Form.Group>
        </>
    );
}