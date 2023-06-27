import {Container, Nav, Navbar} from "react-bootstrap";

export const FooterComponent = () => {
  return (
    <Navbar className="p-2 footer" bg="dark" variant="dark">
      <Container>
        <Nav className="mx-auto flex-column flex-sm-row">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="#">Section Example 1</Nav.Link>
          <Nav.Link href="#">Section Example 2</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}
