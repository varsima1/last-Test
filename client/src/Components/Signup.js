import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import withLoader from './loader/withLoader';
import './scss/Signup/Signup.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [imageALT, setImageALT] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [errors, setErrors] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  const navigate = useNavigate();

  const handleSellerCheckboxChange = (event) => {
    setIsSeller(event.target.checked);
  };

  const handleImageChange = (event) => {
    setImageURL(event.target.value);
  };

  const handleImageALTChange = (event) => {
    setImageALT(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const newUser = {
      name: {
        first: name,
        last: lastName
      },
      phone,
      email,
      password,
      image: {
        url: imageURL,
        alt: imageALT
      },
      address: {
        country,
        city,
        street,
        houseNumber,
        zip: zipCode
      },
      isSeller
    };

    try {
      const response = await axios.post("http://localhost:8181/users", newUser);
      console.log(`User successfully created`);
      setErrors({});
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        console.error(error);
      }
    }
  };
  return (
    <form className='Scontainer' onSubmit={onSubmit}>
      <input type='text' placeholder='name' className='Ssame' required onChange={(e) => setName(e.target.value)} />
      <input type='text' placeholder='lastname' className='Ssame' required onChange={(e) => setLastName(e.target.value)} /><br />
      <div>
      <input type='email' placeholder='Email' className='Esame' required onChange={(e) => setEmail(e.target.value)} /><br />
      <p className='Sred' style={{display: errors['email'] ? 'block' : 'none'}}>{errors['email']}</p>
      </div>
      <div style={{position:'relative'}}>
      <input type={showPassword ? 'text' : 'password'} placeholder='Password' className='Spassword' required onChange={(e) => setPassword(e.target.value)} />
      <span style={{ position: 'absolute',marginTop:'7px'}} className='password-toggle-icon' onClick={togglePasswordVisibility}>
        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
      </span>
      <p className='Sred' style={{display: errors['password'] ? 'block' : 'none'}}>{errors['password']}</p>
      </div>
      <div>
      <input type='text' name="imageURL" value={imageURL} onChange={handleImageChange} className='Esame' placeholder='ImageURL' required={false} /><br />
      <p className='Sred' style={{display: errors['image.url'] ? 'block' : 'none'}}>{errors['image.url']}</p>
      </div>
      <div>
      <input type='text' name="imageALT" value={imageALT} onChange={handleImageALTChange} className='Esame' placeholder='ImageALT' required={false} />
      <p className='Sred' style={{display: errors['image.alt'] ? 'block' : 'none'}}>{errors['image.alt']}</p>
      </div>
      <div className='Sgrid'>
      <input type='text' placeholder='Phone Number' className='Esame' value={phone} onChange={(e) => setPhone(e.target.value)} required />
      <p className='Sred' style={{display: errors['phone'] }}>{errors['phone']}</p>
      </div>
      <div className='Sgrid'>
      <input type='text' placeholder='Country' className='Esame' value={country} onChange={(e) => setCountry(e.target.value)} required />
      <p className='Sred' style={{display: errors['address.country'] ? 'block' : 'none'}}>{errors['address.country']}</p>
      </div>
      <div className='Sgrid'>
      <input type='text' placeholder='City' className='Esame' value={city} onChange={(e) => setCity(e.target.value)} required />
      <p className='Sred' style={{display: errors['address.city'] ? 'block' : 'none'}}>{errors['address.city']}</p>
      </div>
      
      <div className='Sgrid'>
      <input type='text' placeholder='Street' className='Esame' value={street} onChange={(e) => setStreet(e.target.value)} required />
      <p className='Sred' style={{display: errors['address.street'] ? 'block' : 'none'}}>{errors['address.street']}</p>
      </div>
      
      <div className='Sgrid'>
        <input type='text' placeholder='House Number' className='Esame' value={houseNumber} onChange={(e) => setHouseNumber(e.target.value)} required />
        <p className='Sred' style={{display: errors['address.houseNumber'] ? 'block' : 'none'}}>{errors['address.houseNumber']}</p>
      </div>
      <div className='Sgrid'>
        <input type="text" placeholder="Zip Code" className="Esame" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required /><br/>
        <p className='Sred' style={{display: errors['address.zip'] ? 'block' : 'none'}}>{errors['address.zip']}</p>
      </div>
      <label>
          <input type='checkbox' checked={isSeller} onChange={handleSellerCheckboxChange} />
          Are you a seller?
        </label><br/>
      <button className='Sbutton' type='submit'>Signup</button>
    </form>
  );
}

export default withLoader(Signup);

