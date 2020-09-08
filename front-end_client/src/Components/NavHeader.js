import React from "react";
import { Navbar, Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { faShoppingCart, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NavHeader(props) {
  return (
    <div className='NavHeader'>
      <Navbar className='bg-light justify-content-between cartBar' fixed='top'>
        <Form inline>
          <Button
            className='backArrow-button'
            onClick={() => props.setProductToAdd(null)}
          >
            <div className={`nav-icon ${props.productToAdd && "closed"}`}>
              <div></div>
            </div>
          </Button>
        </Form>
        <Form inline>
          <Button className='backArrow-button' onClick={props.viewCartHandler}>
            <span>
              <FontAwesomeIcon icon={faShoppingCart} />{" "}
              {props.orderQuantity || ""}
            </span>
          </Button>
        </Form>
      </Navbar>
    </div>
  );
}
