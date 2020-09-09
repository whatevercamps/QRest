import React from "react";
import { Card, Button } from "react-bootstrap";
export default function MenuCard(props) {
  return (
    <Card className='MenuCard'>
      <Card.Header>
        Menú de <b>{props.menu.RestaurantName}</b>
      </Card.Header>
      <Card.Body>
        {props.menu.pages.map((page, index) => {
          return (
            <>
              <Card.Subtitle className='mb-2 text-muted'>
                Página {page.name}
              </Card.Subtitle>
              <Card.Text>
                {" "}
                {" " + page.sections.length} secciones y{" "}
                {page.sections.reduce(
                  (total, section) => total + section.products.length,
                  0
                )}{" "}
                productos
              </Card.Text>
              {index < props.menu.pages.length - 1 && <hr />}
            </>
          );
        })}
      </Card.Body>
      <Card.Footer className='text-muted'>
        <Button variant='primary' className='editButtonFooter'>
          Editar
        </Button>
        <small>Editado hace {props.menu.lastEdited || "2 minutos"}</small>
      </Card.Footer>
    </Card>
  );
}
