import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
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

/* Components */
import EditSection from "./EditSection";
import ChangePictureHandler from "./ChangePictureHandler";

/* End Components */

export default function EditMenuView(props) {
  /* State */
  const [menu, setMenu] = useState(null);
  const [menuHasChanged, setMenuHasChanged] = useState(false);
  const [newSectionName, setNewSectionName] = useState("");
  const [pictureToChange, setPictureToChange] = useState(null);
  /* Effects */
  useEffect(() => {
    if (props.menu) setMenu(props.menu);
  }, [props.menu]);

  useEffect(() => {
    console.log("Cambio menu", menu);
    if (menu) {
      props.setMenu(menu);
    }
  }, [menu]);
  useEffect(() => {
    if (
      menu &&
      props.menu &&
      JSON.stringify(menu) !== JSON.stringify(props.menu)
    ) {
      console.log("props.menu !== menu");
      setMenuHasChanged(true);
    } else {
      console.log("props.menu === menu");
    }
  }, [menu]);

  /* Functions */
  const createNewSection = (evt) => {
    evt.preventDefault();
    console.log("asdqweqw");
    let m = [...menu];
    m.unshift({ name: newSectionName, products: [] });
    setMenu(m);
  };

  /* End Function */

  return menu ? (
    <div className='EditMenuView'>
      {pictureToChange ? (
        <ChangePictureHandler pictureToChange={pictureToChange} />
      ) : (
        <Container>
          <Row>
            <Col>
              <Breadcrumb className='Breadcrumb'>
                <Breadcrumb.Item>Edit</Breadcrumb.Item>
                <Breadcrumb.Item>{menu.restaurantName}</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card className='EditMenuCard'>
                <Card.Header>
                  <Navbar>
                    <Navbar.Brand>Secciones</Navbar.Brand>
                    <Nav className='ml-auto'>
                      <Nav.Item>
                        <Button
                          onClick={props.saveChangesHandler}
                          variant='success'
                          size='sm'
                          className={`saveChangesButton ${
                            menuHasChanged && "fixedButton"
                          }`}
                        >
                          Guardar cambios
                        </Button>
                      </Nav.Item>
                    </Nav>
                  </Navbar>
                </Card.Header>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h5>Crear sección</h5>
                    <Form inline onSubmit={createNewSection}>
                      <FormControl
                        className='editMenuInput'
                        type='text'
                        className='mr-sm-2'
                        onChange={(evt) => setNewSectionName(evt.target.value)}
                        value={newSectionName}
                        placeholder='nombre de la sección'
                      />
                      <Button variant='outline-success' type='submit'>
                        Crear nueva sección
                      </Button>
                    </Form>
                  </ListGroup.Item>
                  {menu.map((section, index) => {
                    return (
                      <ListGroup.Item key={index} className='editMenuSection'>
                        <EditSection
                          section={section}
                          sectionIndex={index}
                          setPictureToChange={setPictureToChange}
                          setSection={(s) => {
                            let m = [...menu];
                            m[index] = s;
                            setMenu(m);
                          }}
                        />
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  ) : (
    <></>
  );
}
