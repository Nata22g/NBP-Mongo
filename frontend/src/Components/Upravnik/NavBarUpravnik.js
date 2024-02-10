import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

export default function NavBarDirektor()
 {
  const navigate=useNavigate();


  const IdiNaUpravnik=()=>
  {
     navigate('/Upravnik');
  }

  const IdiNaZgrade=()=>
  {
     navigate('/Zgrade');
  }

  const IdiNaKvaroviUpravnik=()=>
  {
     navigate('/KvaroviUpravnik');
  }
  const IdiNaAnkete=()=>
  {
     navigate('/Ankete');
  }

  const IdiNaHome=()=>
  {
     navigate('/HomeU');
  }
  const handleLogout = () => {
    
    navigate('/login');
  }
 

  
  return (
    <div >


      <Navbar sticky='top'collapseOnSelect expand="lg" bg="dark" variant="dark" responsive='true' >
      <Container fluid>
        <Navbar.Brand href="/Home" >Smart Walls</Navbar.Brand>
        <Navbar.Toggle id="toggle" aria-controls="navbarScroll" aria-expanded="false" />
        <Navbar.Collapse id="navbarScroll" >
          <Nav className="me-auto mt-2 mt-lg-0 " >
          <Nav.Link onClick={()=>{IdiNaHome()}} to="/HomeU">Home</Nav.Link>
            <Nav.Link onClick={()=>{IdiNaZgrade()}} to="/ZgradeUpravnik">Zgrade</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link className="d-flex align-items-center" onClick={() => { IdiNaUpravnik() }} to="/Upravnik">
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
