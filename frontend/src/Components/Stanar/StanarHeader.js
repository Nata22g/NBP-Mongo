import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function NavBarStanari() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const IdiNaKvarove = () => {
    navigate('/KvaroviStanar');
  };

  // const IdiNaAnkete = () => {
  //   navigate('/AnketeStanar');
  // };

  const IdiNaHome = () => {
    navigate('/Home');
  };

  const IdiNaStanar = () => {
    navigate('/Stanar');
  };
  const IdiNaStanarObavestenja = () => {
    navigate('/ObavestenjaStanar');
  };

  const handleLogout = () => {
    
    navigate('/login');
  }

  return (
    <div>
      <Navbar
        sticky='top'
        collapseOnSelect
        expand='lg'
        bg='dark'
        variant='dark'
        responsive='true'
      >
        <Container fluid>
          <Navbar.Brand href='/Home'>Smart Walls</Navbar.Brand>
          <Navbar.Toggle id='toggle' aria-controls='navbarScroll' aria-expanded='false' />
          <Navbar.Collapse id='navbarScroll'>
            <Nav className='me-auto mt-2 mt-lg-0'>
              <Nav.Link onClick={IdiNaHome} to='/Home'>
                Home
              </Nav.Link>
              <Nav.Link onClick={IdiNaKvarove} to='/KvaroviStanar'>
                Kvarovi
              </Nav.Link>
              {/* <Nav.Link onClick={IdiNaAnkete} to='/AnketeStanar'>
                Ankete
                </Nav.Link> */}
              <Nav.Link onClick={IdiNaStanarObavestenja} to='/ObavestenjaStanar'>
                Oglasna tabla
              </Nav.Link>
            </Nav>
            <Nav className='ms-auto'>
              <Nav.Link onClick={IdiNaStanar} to='/Stanar'>
                <FaUser className='me-1' />
                
              </Nav.Link>
          
            <Nav.Link className="d-flex align-items-center" onClick={handleLogout}>
                <FaSignOutAlt className="me-1" />
                
              </Nav.Link>
            </Nav> 
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
