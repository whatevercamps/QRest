import React from "react";
import { Card, Button } from "react-bootstrap";
export default function RestaurantCard(props) {
  return (
    <Card className='RestaurantCard'>
      <Card.Header>{props.restaurant.name}</Card.Header>
      <Card.Body>
        <Card.Subtitle className='mb-2 text-muted'>Dirección</Card.Subtitle>
        <Card.Text>{props.restaurant.address}</Card.Text>
        <hr />
        <Card.Subtitle className='mb-2 text-muted'>Teléfono</Card.Subtitle>
        <Card.Text>{props.restaurant.phone}</Card.Text>
        <hr />
        <Card.Text>{props.restaurant.tables.length} mesas</Card.Text>
      </Card.Body>
      <Card.Footer className='text-muted'>
        <Button variant='primary' className='editButtonFooter'>
          Editar
        </Button>
        <small>
          Editado hace {props.restaurant.menu.lastEdited || "2 minutos"}
        </small>
      </Card.Footer>
    </Card>
  );
}
