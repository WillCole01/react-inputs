// import  from 'react-bootstrap/Nav';
// import Container from 'react-bootstrap/Container';
// import  from 'react-bootstrap/NavDropdown';
import {Navbar,Nav,Container, NavDropdown } from 'react-bootstrap';
import {Route, Routes} from 'react-router-dom';

import Calcs from "../Calcs.js";
import FilterGroups from "../FilterGroups.js";
import Model from "../Model.js";
import QuestionMapper from "../QuestionMapper.js";
import Nodes from "../Nodes.js";


function BtsNavbar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Model Builder</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          
            <NavDropdown title="Run actions" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Select test run</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Run inputs</NavDropdown.Item>
            </NavDropdown> 

            <Nav.Link href="/">Model</Nav.Link>
            <Nav.Link href="/Calcs">Calcs</Nav.Link>
            <Nav.Link path="/FilterGroups">FilterGroups</Nav.Link>
            <Nav.Link path="/Nodes">Nodes</Nav.Link>
            <Nav.Link path="/QuestionMapper">Question Mapper</Nav.Link>
          
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BtsNavbar;