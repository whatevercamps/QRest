import React from "react";
import { Row, Col } from "react-bootstrap";

/* Components */
import RestaurantCard from "./RestaurantCard";
/* End Components */

export default function AdminRestaurantsOverview(props) {
  return (
    <Row>
      {props.restaurants.map((restaurant, index) => {
        return (
          <Col lg={3} md={12} key={index}>
            <RestaurantCard restaurant={restaurant} key={index} />
          </Col>
        );
      })}
    </Row>
  );
}
