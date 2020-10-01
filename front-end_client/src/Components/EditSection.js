import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Button,
  Form,
  FormControl,
  ButtonGroup,
  Navbar,
  Nav,
} from "react-bootstrap";

/*
 * Components
 */
import EditProduct from "./EditProduct";

/*
 * End Components
 */

export default function EditSection(props) {
  /*
   * State
   */
  const [section, setSection] = useState(null);
  /*
   * Effects
   */

  useEffect(() => {
    if (props.section) setSection(props.section);
  }, [props.section]);

  useEffect(() => {
    if (section) props.setSection(section);
  }, [section]);

  /*
   * Functions
   */

  const addProductHandler = () => {
    let s = { ...section };
    s.products.unshift({
      name: null,
      ingredients: null,
      description: null,
      price: null,
      imgUrl: null,
    });
    setSection(s);
  };

  return section ? (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={(evt) => evt.preventDefault()}>
            <Form.Label>Nombre de la sección</Form.Label>
            <FormControl
              className='editMenuInput'
              type='text'
              value={section.name}
              onChange={(evt) => {
                console.log("askd", evt.target.value);
                const s = { ...section };
                s["name"] = evt.target.value;
                setSection(s);
              }}
              placeholder={section.name}
              className='mr-sm-2'
            />
          </Form>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col xs={12} md={4}>
          Productos
        </Col>
        <Col xs={12} md={{ span: 4, offset: 4 }}>
          <Button variant='success' size='sm' onClick={addProductHandler}>
            Agregar nuevo producto
          </Button>
        </Col>
      </Row>
      <Row>
        {section.products.map((product, index) => {
          return (
            <Col xl={4} md={6} sm={12} key={index}>
              <EditProduct
                product={product}
                key={index}
                setPictureToChange={props.setPictureToChange}
                setProduct={(p) =>
                  setSection((s) => {
                    s.products[index] = p;
                    return s;
                  })
                }
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  ) : (
    <></>
  );
}
