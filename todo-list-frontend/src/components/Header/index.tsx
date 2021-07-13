import Cookies from 'js-cookie';
import React from 'react';
import { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { signOut } from '../../actions';



const Header: React.FC = () => {
  const [userName, setUserName] = useState('')
  const history = useHistory()

  useEffect(() => {
    setUserName(Cookies.get('userName') || '')
  }, [])

  const handleSignOut = async (e: any) => {
    e.preventDefault();
    await signOut()
    history.push('/login')
  }
  return(
    <Navbar bg="light" expand="lg" className="p-3">
      <Navbar.Brand><h2>ToDo List</h2></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="d-flex justify-content-end">
        <Nav className="mr-auto">
          <NavDropdown title={userName} id="basic-nav-dropdown">
            <NavDropdown.Item href="#" onClick={handleSignOut}>Exit</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;