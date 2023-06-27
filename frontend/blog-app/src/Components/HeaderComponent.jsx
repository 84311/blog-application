import {Container, Nav, Navbar} from "react-bootstrap";

export const HeaderComponent = () => {
  return (
    <Navbar className="p-2" bg="dark" variant="dark" expand="sm">
      <Container>
        <Navbar.Brand className="text-gold" href="/">Blog App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#">Section Example 1</Nav.Link>
            <Nav.Link href="#">Section Example 2</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
