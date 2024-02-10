import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
export default function Header() {
  return (
    <div >
      <Navbar sticky='top'collapseOnSelect expand="lg" className='header'variant='dark' responsive='true' >
      <Container fluid>
      <Navbar.Brand href='/Home'> </Navbar.Brand>
          
        <Navbar.Toggle id='toggle' aria-controls='navbarScroll' aria-expanded='false' />
        <Navbar.Collapse id="navbarScroll" >
          <Nav className="me-auto mt-2 mt-lg-0 " >
            <Nav.Link className="links" href="/">Home</Nav.Link>
               <Nav.Link className="links" href="/login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}


        
