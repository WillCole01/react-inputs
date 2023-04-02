import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

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
              <NavDropdown.Item href="#action/3.2">
                Run inputs
              </NavDropdown.Item>
            </NavDropdown> 
            <Nav.Link href="#home">Calc Builder</Nav.Link>
            <Nav.Link href="#home">Filter Groups</Nav.Link>
            <Nav.Link href="#home">Nodes</Nav.Link>
            <Nav.Link href="#home">Question Mapper</Nav.Link>
            <Nav.Link href="#link">Model</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BtsNavbar;