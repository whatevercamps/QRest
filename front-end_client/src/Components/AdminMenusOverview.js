import React from "react";
import { Row, Col } from "react-bootstrap";

/* Components */
import MenuCard from "./MenuCard";
/* End Components */

export default function AdminMenusOverview(props) {
  return (
    <Row>
      {props.menus.map((menu) => {
        return (
          <Col md={4}>
            <MenuCard menu={menu} />
          </Col>
        );
      })}
    </Row>
  );
}
