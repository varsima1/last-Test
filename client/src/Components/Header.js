import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, DropdownButton, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faBars, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './scss/header/header.scss';
import DarkMode from './DarkMode';
import { useAuth } from './AuthContext';

function Header() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { token, logout,userObject} = useAuth();

  const isSeller = userObject && userObject.role === 'seller';

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 1000);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header>
      <Navbar expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/" className='Logo'><h1 className='logo'></h1></Navbar.Brand>
          <DarkMode />
          {isMobile ? (
            <Navbar.Toggle
              onClick={toggleMobileMenu}
              aria-controls="responsive-navbar-nav"
            >
              <FontAwesomeIcon icon={faBars} />
            </Navbar.Toggle>
          ) : null}
          <Navbar.Collapse id="responsive-navbar-nav"style={{margin:'10px'}}>
            <Nav className={`mr-auto ${isMobile && showMobileMenu ? 'mobile-menu' : ''}`}>
              <Nav.Link as={Link} to="/" style={{margin:'10px' ,color:'white'}}>About</Nav.Link>
              <Nav.Link as={Link} to="/market" style={{margin:'10px' ,color:'white'}}>Market</Nav.Link>
              {userObject?.isSeller && (
            <Nav.Link as={Link} to="/mycards" style={{ margin: '10px', color: 'white' }}>
              My cards
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>

          {/* Cart icon */}
          <Nav.Link as={Link} to='/shoppingCard' >
            <FontAwesomeIcon icon={faShoppingCart} style={{ height: '20px',color:'white',}} />
            </Nav.Link>
          <button className="cart-icon" onClick={() => console.log('Clicked on cart')}>
          </button>

          <Nav   className={`mr-auto ${isMobile && showMobileMenu ? 'mobile-menu' : ''}`}>
            {token ? (
              <DropdownButton
                // id="user-menu"
                title={
                  <div style={{ transition:'1.0s', display: "flex", alignItems: "center" }}>
                    <FontAwesomeIcon icon={faUser} style={{ marginLeft: '3px' }} />
                  </div>
                }
                show={isUserMenuOpen}
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                
              >
                <Nav.Link as={Link} to={'/profile'} className='text-dark' style={{ marginLeft: '10px' }}>My Profile</Nav.Link>
                <Nav.Link as={Link} to={'/settings'} className='text-dark' style={{ marginLeft: '10px' }}>Edit User</Nav.Link>
                <Dropdown.Divider />
                <Nav.Link onClick={handleLogout} className='text-dark' style={{ marginLeft: '10px' }}>Logout</Nav.Link>
              </DropdownButton>
            ) : (
              <Nav.Link   style={{color:'white' ,margin:'10px'}} as={Link} to="/login" className='HLogin'>
                Login
              </Nav.Link >
            )}
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
