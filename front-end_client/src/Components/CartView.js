import React from "react";
import ProductResume from "./ProductResume";
import { Container, Row, Col, Button } from "react-bootstrap";
export default function CartView(props) {
  const confirmOrder = () => {
    const payload = {
      token: props.token,
      order: props.order,
    };

    if (props.order && props.order.length) {
      fetch("http://localhost:3001/client/makeOrder", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }).then((res) => {
        console.log("resp", res);

        if (res.status === 200) {
          console.log("mensaje enviado");
        }
      });
    }
  };

  return (
    <div className='CartView'>
      <Container>
        <Row>
          <Col>
            <h2>Su orden</h2>
          </Col>
        </Row>
        <hr />
        {props.order.map((item, index) => (
          <Row key={index}>
            <Col>
              <ProductResume item={item} />
            </Col>
          </Row>
        ))}
      </Container>
      <div className='OrderFooter'>
        <Button
          className='ConfirmOrderButton'
          onClick={confirmOrder}
          disabled={!props.order || !props.order.length}
        >
          Confirmar orden por $
          {(() => {
            let totalPrice = 0;
            props.order.forEach((item) => {
              totalPrice += item.product.price * item.quantity;
            });
            return totalPrice;
          })()}
        </Button>
      </div>
    </div>
  );
}
