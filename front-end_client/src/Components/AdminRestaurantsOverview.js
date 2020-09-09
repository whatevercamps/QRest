import React from "react";
import { Row, Col } from "react-bootstrap";

/* Components */
import RestaurantCard from "./RestaurantCard";
/* End Components */

export default function AdminRestaurantsOverview(props) {
  return (
    <Row>
      {props.restaurants.map((restaurant) => {
        return (
          <Col md={4}>
            <RestaurantCard restaurant={restaurant} />
          </Col>
        );
      })}
    </Row>
  );
}
