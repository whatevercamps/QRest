import React, { useState } from "react";
import { Image, Card, Button, Form } from "react-bootstrap";

/* Components */
import QuantityHandler from "./QuantityHandler";
/* End components */

export default function AddProductHandler(props) {
  /* State  */
  const [quantity, setQuantity] = useState(1);
  const [details, setDetails] = useState("");
  /* End state */
  return (
    <div className='AddProductHandler'>
      <Card className='AddProductHandlerCard'>
        <Card.Img variant='top' src='https://picsum.photos/600/400' />
        <Card.Body>
          <Card.Title>
            <h2>{props.product.name}</h2>
            <hr />
          </Card.Title>
          <Card.Text>
            <small>Ingredientes</small>
            <br />
            {props.product.ingredients}
          </Card.Text>
          <hr />
          <Form>
            <Form.Group controlId='exampleForm.ControlTextarea1'>
              <Form.Label>Comentarios para la cocina</Form.Label>
              <Form.Control
                as='textarea'
                rows='3'
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Card.Body>
        <Card.Footer>
          <div className='makeConfirm'>
            <QuantityHandler setQuantity={setQuantity} quantity={quantity} />
            <Button
              className='confirm-button'
              onClick={() =>
                props.addProductToOrder(props.product, quantity, details)
              }
            >
              $ {props.product.price * quantity}
            </Button>
          </div>
          <small className='text-muted'>
            Seleccionar la cantidad de platos
          </small>
        </Card.Footer>
      </Card>
    </div>
  );
}
