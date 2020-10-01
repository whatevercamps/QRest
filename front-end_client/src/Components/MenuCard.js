import React from "react";
import { Card, Button } from "react-bootstrap";
export default function MenuCard(props) {
  return (
    <Card className='MenuCard'>
      <Card.Header>
        Menú de <b>{props.restaurantName}</b>
      </Card.Header>
      <Card.Body>
        {props.menu.map((section, index) => {
          return (
            <div key={index}>
              <Card.Subtitle className='mb-2 text-muted'>
                Sección de {section.name}
              </Card.Subtitle>
              <Card.Text>
                {" "}
                {" " + section.products.length}{" "}
                {section.products.length === 1 ? "producto" : "productos"}
              </Card.Text>
              {index < props.menu.length - 1 && <hr />}
            </div>
          );
        })}
      </Card.Body>
      <Card.Footer className='text-muted'>
        <Button
          variant='primary'
          className='editButtonFooter'
          onClick={() => props.setMenuToEdit(props.menu)}
        >
          Editar
        </Button>
        <small>Editado hace {props.menu.lastEdited || "2 minutos"}</small>
      </Card.Footer>
    </Card>
  );
}
