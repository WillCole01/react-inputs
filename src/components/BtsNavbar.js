import {Navbar,Nav,Container, NavDropdown, Button } from 'react-bootstrap';

const BtsNavbar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Model Builder</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          
            <NavDropdown title="Run actions" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Select test run</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Run inputs</NavDropdown.Item>
            </NavDropdown> 

            <Nav.Link href="/">Model</Nav.Link>
            <Nav.Link href="/Calcs">Calcs</Nav.Link>
            <Nav.Link href="/FilterGroups">FilterGroups</Nav.Link>
            <Nav.Link href="/Nodes">Nodes</Nav.Link>
            <Nav.Link href="/QuestionMapper">Question Mapper</Nav.Link>

          </Nav>
          
          <Button variant="outline-success">
            <Nav.Link href="/Auth">Log In</Nav.Link>
          </Button>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BtsNavbar;