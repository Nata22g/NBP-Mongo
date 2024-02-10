import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';


export default function NavBarDirektor() {
  const navigate = useNavigate();

  const IdiNaDirektor = () => {
    navigate('/Direktor');
  }

  const IdiNaKvarovi = () => {
    navigate('/Kvarovi');
  }

  const IdiNaPrikazZgrada = () => {
    navigate('/PregledZgrada');
  }

  const IdiNaUpravnici = () => {
    navigate('/Upravnici');
  }

  const handleLogout = () => {
    
    navigate('/login');
  }

  return (
    <div>
      <Navbar sticky='top' collapseOnSelect expand="lg" bg="dark" variant="dark" responsive='true'>
        <Container fluid>
          <Navbar.Brand as={Link} to="/Home">Smart Walls</Navbar.Brand>
          <Navbar.Toggle id="toggle" aria-controls="navbarScroll" aria-expanded="false" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto mt-2 mt-lg-0">
              <Nav.Link as={Link} to="/Upravnici">Upravnici</Nav.Link>
              <Nav.Link as={Link} to="/Kvarovi">Kvarovi</Nav.Link>
              <Nav.Link as={Link} to="/PregledZgrada">Zgrade</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link className="d-flex align-items-center" onClick={IdiNaDirektor} to="/Direktor">
                <FaUser className="me-1" />
                
              </Nav.Link>
              <Nav.Link className="d-flex align-items-center" onClick={handleLogout}>
                <FaSignOutAlt className="me-1" />
                
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}
