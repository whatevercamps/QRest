import React from "react";
import { Row, Col } from "react-bootstrap";

/* Components */
import MenuCard from "./MenuCard";
/* End Components */

export default function AdminMenusOverview(props) {
  return (
    <Row>
      {props.restaurants.map((restaurant, index) => {
        return (
          <Col lg={4} md={6} key={index}>
            <MenuCard
              menu={restaurant.menu}
              restaurantName={restaurant.name}
              setMenuToEdit={() => {
                props.setMenuToEdit(restaurant.menu);
                props.setMenuToEditId(restaurant._id);
              }}
              key={index}
            />
          </Col>
        );
      })}
    </Row>
  );
}
