import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function ProductResume(props) {
  return (
    <div className='ProductResume'>
      <Container>
        <Row>
          <Col xs={3}>
            <Image className='photo' src='https://picsum.photos/200' />
          </Col>

          <Col xs={7}>
            <h4>{props.item.product.name}</h4>
            <small>{props.item.details}</small>
            <p>$ {props.item.product.price * props.item.quantity}</p>
          </Col>
          <Col xs={2}>
            <Row>
              <Col>
                <Button
                  className='noview-button'
                  onClick={props.viewCartHandler}
                >
                  <span>
                    <FontAwesomeIcon icon={faEdit} />{" "}
                    {props.orderQuantity || ""}
                  </span>
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  className='noview-button'
                  onClick={props.viewCartHandler}
                >
                  <span>
                    <FontAwesomeIcon icon={faTrashAlt} />{" "}
                    {props.orderQuantity || ""}
                  </span>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
