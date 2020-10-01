import React from "react";
import { Breadcrumb, Container, Row, Col } from "react-bootstrap";

/* Components */
import AdminRestaurantsOverview from "./AdminRestaurantsOverview";
import AdminMenusOverview from "./AdminMenusOverview";
/* End Components */

export default function AdminOverview(props) {
  return (
    <div className='AdminOverview'>
      <Container>
        <Row>
          <Col>
            <Breadcrumb className='Breadcrumb'>
              <Breadcrumb.Item>Admin</Breadcrumb.Item>
              <Breadcrumb.Item>Mis menús</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <AdminMenusOverview
          setMenuToEditId={props.setMenuToEditId}
          setMenuToEdit={props.setMenuToEdit}
          restaurants={props.restaurants}
        />
        <Row>
          <Col>
            <Breadcrumb className='Breadcrumb'>
              <Breadcrumb.Item>Admin</Breadcrumb.Item>
              <Breadcrumb.Item>Mis restaurantes</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <AdminRestaurantsOverview restaurants={props.restaurants} />
      </Container>
    </div>
  );
}
