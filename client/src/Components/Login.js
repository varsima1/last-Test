
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './scss/Login/Login.scss';
import withLoader from './loader/withLoader';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { login } = useAuth();
  const [errors, setErrors] = useState({ email: '', password: '' });
  const navigate = useNavigate();


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (password === '') {
      return;
    }


    const passwordPattern = /^(?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20}$/;

    if (!password.match(passwordPattern)) {
      setErrors({ password: 'mail or password not correct in password use 9+ characters, 1 uppercase, 1 lowercase, 1 number, 1 special character.' });
      return;
    }


    try {
      const response = await axios.post('http://localhost:8181/users/login', {
        email,
        password,
      });

      
      login(response.data);
      navigate('/');
      
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className='Lcontainer'>
        <input type='Email' placeholder='Email' className='Lsame'  value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <p className='Sred'>{errors.email}</p>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder='Password'
          className='Lsame'
          value={password} onChange={(e) => setPassword(e.target.value)}
        />
        {formSubmitted && password !== '' && errors.password && <p className="Sred">{errors.password}</p>}
        <span className='password-toggle-icon' onClick={togglePasswordVisibility}>
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </span>
        <br />
        <button className='Lbutton'>Log in</button>
        <br />
        <Link to={'/signup'}><button className='Lbutton'>Sign up</button></Link>
      </div>
    </form>
  );
}

export default withLoader(Login);
