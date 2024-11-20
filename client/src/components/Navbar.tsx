import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const MainBar = () => {
  return (
    <div>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">BOOKFLIX</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/choice">Home</Nav.Link>
            <Nav.Link href="/logout">Logout</Nav.Link>
            <NavDropdown title="Choice" id="basic-nav-dropdown">
              <NavDropdown.Item href="/books">Books</NavDropdown.Item>
              <NavDropdown.Item href="/movies">
                Movies
              </NavDropdown.Item>
              <NavDropdown.Item href="/liked">Liked</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/bookmarked">
                Bookmarked
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    </div>
  );
};

export default MainBar;
