import React from 'react';
import { Link } from 'react-router-dom';
import { MDBFooter } from 'mdb-react-ui-kit';
import logo from './image/logo.png';
import { useAuth } from './AuthContext';

export const Footer = () => {
  const {userObject} = useAuth();
  return (
    <div className='footer-wrapper'>
      <MDBFooter id='custom-footer' className='text-center text-lg-left bg-primary text-light p-4'>
        <div className='footerLinks d-flex justify-content-between align-items-center'>
          <Link to='/'>
            <img src={logo} alt="Logo" width="50" height="50" style={{ cursor: 'pointer' }} className="me-2" />
          </Link>
          <ul className="nav">
            <li className="nav-item">
              <Link to='/' className="nav-link text-light">About</Link>
            </li>
            <li className="nav-item">
              <Link to='/market' className="nav-link text-light">Market</Link>
            </li>
            {userObject?.isSeller && (
            <li className="nav-item">
              <Link to='/mycards' className="nav-link text-light">My Card</Link>
            </li>
            )}
          </ul>
        <div className='text-center p-3'>
          <span className='text-light small'>
            &copy; {new Date().getFullYear()} Created by Luka Varsimashvili
          </span>
        </div>
    </div>

      </MDBFooter>
  </div>
  );
};
