import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const MainBar = () => {
  const [loginToken, setLoginToken] = useState<string | null>(localStorage['token']);

  return (
    <div>
      <Link to="/" style={{ textDecoration: 'none', color: '#ffc107' }}>
        <h1 className="text-center">BOOKFLIX</h1>
      </Link>
      <div className="nav">
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="/choice" className="text-warning">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Nav className="ml-auto">
                {!loginToken ? (
                  <Nav.Link href="/" className="text-warning">Login</Nav.Link>
                ) : null}
                {loginToken ? (
                  <Nav.Link
                    onClick={() => {
                      localStorage.removeItem('token');
                      setLoginToken(null);
                    }}
                    className="text-warning"
                  >
                    Logout
                  </Nav.Link>
                ) : null}
                <Nav.Link href="/books" className="text-warning">Book</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};

export default MainBar;
