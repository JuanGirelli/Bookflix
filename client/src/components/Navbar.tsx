import { Link } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


import { useState } from "react";

const MainBar = () => {

  const [loginToken, setLoginToken] = useState<string | null>(localStorage['token']);

  return (
    <div className="nav">
      <div className="nav-title">
{/* 
        <Link to='/'>
          <h2>BOOKFLIX</h2>
        </Link> */}

<Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">BOOKFLIX</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            { !loginToken ? (
            <Nav.Link href="/">Login</Nav.Link>
            ) : null}

            { loginToken ? (
            <Nav.Link onClick={() => {
              localStorage.removeItem('token');
              setLoginToken(null);
            } }>Logout</Nav.Link>
            ) : null}

            <Nav.Link href="/books">Book</Nav.Link>


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>



      </div>
    </div>
  )
}

export default MainBar;
