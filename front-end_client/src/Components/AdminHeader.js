import React from "react";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";
export default function AdminHeader() {
  return (
    <Navbar bg='light' expand='lg'>
      <Navbar.Brand href='#home'>QRest</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <NavDropdown title='Acciones' id='basic-nav-dropdown'>
            <NavDropdown.Item href='#action/3.1'>
              Editar restaurantes
            </NavDropdown.Item>
            <NavDropdown.Item href='#action/3.2'>Editar Menús</NavDropdown.Item>
            <NavDropdown.Item href='#action/3.3'>
              Editar empleados
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href='#action/3.4'>
              Editar perfil
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href='#home' disabled>
            Analítica
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href='#deets'>Cerrar sesión</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
