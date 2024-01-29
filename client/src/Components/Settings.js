import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from './AuthContext';
import withLoader from './loader/withLoader';
import { jwtDecode } from 'jwt-decode';
import ErrorPage from './ErrorPage';
import './scss/settings/Settings.scss';
import { useNavigate } from 'react-router-dom';

const take = (x,y,defaultValue = "") =>  {
  if(!y)return x
  if(x) return x
  if(!x)return y
  if(typeof x === 'string')
    if(x.length === 0)return y
  if(typeof y === 'string') 
    if(y.length === 0)return x
    return defaultValue  
}

function Settings() {
  const { token, updateUser,logout} = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: '',
    imageURL: '',
    alt: '',
    country: '',
    city: '',
    street: '',
    houseNumber: '',
  });

  useEffect(() => {
    // Update the form data with user information when the user object is available
    if (token) {
      setFormData((prevFormData) => {
        const { phone, address, image } = token;
  
        return {
          ...prevFormData,
          imageURL: formData.imageURL || image?.url || '',
          alt: formData.alt || image?.alt || '',
          phone: formData.phone || phone || '',
          country: formData.country || address?.country || '',
          city: formData.city || address?.city || '',
          street: formData.street || address?.street || '',
          houseNumber: formData.houseNumber || address?.houseNumber || '',
        };
      });
    }
  }, [token]);

  if (!token) {
    // Handle the case when the user is null or undefined (redirect to the login page or show a message)
    return <div><ErrorPage/></div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const getUser = async(id) => {
    const response = await axios.get(`http://localhost:8181/users/${id}`, {
     headers:{
      'x-auth-token':token
     }
    });
    return response.data
  }
  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const userId = jwtDecode(token)._id;
     const existingUser = await getUser(userId)
  
      const updatedFormData = {};
  
      // Image data
      updatedFormData.image = {
        ...(existingUser.image || {}),
        url: take(formData.imageURL,  existingUser.image?.url),
        alt: take(formData.alt, existingUser.image?.alt , 'Business card image'),
      };
  
      // Phone
      updatedFormData.phone = take(formData.phone , existingUser.phone)
  
      // Address
      updatedFormData.address = {
        ...(existingUser.address || {}),
        country: take(formData.country , existingUser.address?.country),
        city: take(formData.city , existingUser.address?.city ),
        street: take(formData.street , existingUser.address?.street),
        houseNumber:  +take(formData.houseNumber , existingUser.address?.houseNumber),
      };

      updatedFormData.name = existingUser.name
      if(updatedFormData.address._id) {
          delete updatedFormData.address._id; 
      }
      if(updatedFormData.image._id)
        delete updatedFormData.image._id; 
      if(updatedFormData.name?._id)
        delete updatedFormData.name._id

      const response = await axios.put(`http://localhost:8181/users/${userId}`, updatedFormData, {
        headers: {
          'x-auth-token': token,
        },
      });
      navigate('/login');
  
      // Update the user context with the updated user information
      updateUser(response.data);

      // Log the user out after updating their information
      logout();
      // Redirect or show a success message
    } catch (error) {
      console.error(error);
      // Handle error, show an error message, etc.
    
    
    }

  // ... (rest of your code)
  };
  
  
  
  return (
    <div className='Settings-container'>
      <Form onSubmit={onSubmit}>
        <h1 className='editUsers'>Edit User</h1>
        <br/>
        <Form.Group controlId="formImage">
          <Form.Label>Image Url</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Image Url"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleInputChange}
            required={false}
          />
        </Form.Group>
        <br/>
        <Form.Group controlId="formAlt">
          <Form.Label>Image Alt</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter alt text for the image"
            name="alt"
            value={formData.alt}
            onChange={handleInputChange}
            required={false}
          />
        </Form.Group>
        <br/>
        <Form.Group controlId="formPhone">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
      type="text"
            placeholder="Enter your phone number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required={false}
          />
        </Form.Group>
        <br/>
        <Form.Group controlId="formCountry">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            required={false}
          />
        </Form.Group>
        <br/>
        <Form.Group controlId="formCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required={false}
          />
        </Form.Group>
        <br/>
        <Form.Group controlId="formStreet">
          <Form.Label>Street</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your street"
            name="street"
            value={formData.street}
            onChange={handleInputChange}
            required={false}
          />
        </Form.Group>
        <br/>
        <Form.Group controlId="formHouseNumber">
          <Form.Label>House Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your house number"
            name="houseNumber"
            value={formData.houseNumber}
            onChange={handleInputChange}
            required={false}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className='Sbsave'>
          Save Changes
        </Button>
        <div className='dda'></div>
      </Form>
    </div>
  );
}

export default withLoader(Settings);








// import React, { useState, useEffect } from 'react';
// import { Form, Button } from 'react-bootstrap';
// import axios from 'axios';
// import { useAuth } from './AuthContext';
// import withLoader from './loader/withLoader';
// import { jwtDecode } from 'jwt-decode';
// import ErrorPage from './ErrorPage';
// import './scss/settings/Settings.scss';

// function Settings() {
//   const { user, updateUser } = useAuth();
//   const [formData, setFormData] = useState({
//     phone: '',
//     imageURL: '',
//     alt: '',
//     country: '',
//     city: '',
//     street: '',
//     houseNumber: '',
//   });

//   useEffect(() => {
//     // Update the form data with user information when the user object is available
//     if (user) {
//       const { phone, address, image } = user;
//       setFormData({
//         imageURL: image?.url || '',
//         alt: image?.alt || '',
//         phone: phone || '',
//         country: address?.country || '',
//         city: address?.city || '',
//         street: address?.street || '',
//         houseNumber: address?.houseNumber || '',
//       });
//     }
//   }, [user]);

//   if (!user) {
//     // Handle the case when the user is null or undefined (redirect to the login page or show a message)
//     return <div><ErrorPage/></div>;
//   }

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const onSubmit = async (event) => {
//     event.preventDefault();
//     const userId = jwtDecode(user)._id;
//     try {
//       const imageData = {
//         url: formData.imageURL,
//         alt: formData.alt,
//       };

//       const address = {
//         country: formData.country,
//         city: formData.city,
//         street: formData.street,
//         houseNumber: formData.houseNumber,
//       };

//       const updatedFormData = {
//         ...formData,
//         image: imageData,
//         address,
//       };

//       delete updatedFormData.imageURL;
//       delete updatedFormData.alt;
//       delete updatedFormData.country;
//       delete updatedFormData.city;
//       delete updatedFormData.street;
//       delete updatedFormData.houseNumber;
      
//       const response = await axios.put(`http://localhost:8181/users/${userId}`, updatedFormData, {
//         headers: {
//           'x-auth-token': user,
//         },
//       });

//       // Update the user context with the updated user information
//       updateUser(response.data);
//       // Redirect or show a success message
//     } catch (error) {
//       console.error(error);
//       // Handle error, show an error message, etc.
//     }
//   };

//   return (
//     <div className='Settings-container'>
//       <Form onSubmit={onSubmit}>
//         <h1 className='editUsers'>Edit User</h1>
//         <br/>
//         <Form.Group controlId="formImage">
//           <Form.Label>Image Url</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter your Image Url"
//             name="imageURL"
//             value={formData.imageURL}
//             onChange={handleInputChange}
//             required={false}
//           />
//         </Form.Group>
//         <br/>
//         <Form.Group controlId="formAlt">
//           <Form.Label>Image Alt</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter alt text for the image"
//             name="alt"
//             value={formData.alt}
//             onChange={handleInputChange}
//             required={false}
//           />
//         </Form.Group>
//         <br/>
//         <Form.Group controlId="formPhone">
//         <Form.Label>Phone Number</Form.Label>
//         <Form.Control
//       type="text"
//             placeholder="Enter your phone number"
//             name="phone"
//             value={formData.phone}
//             onChange={handleInputChange}
//             required={false}
//           />
//         </Form.Group>
//         <br/>
//         <Form.Group controlId="formCountry">
//           <Form.Label>Country</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter your country"
//             name="country"
//             value={formData.country}
//             onChange={handleInputChange}
//             required={false}
//           />
//         </Form.Group>
//         <br/>
//         <Form.Group controlId="formCity">
//           <Form.Label>City</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter your city"
//             name="city"
//             value={formData.city}
//             onChange={handleInputChange}
//             required={false}
//           />
//         </Form.Group>
//         <br/>
//         <Form.Group controlId="formStreet">
//           <Form.Label>Street</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter your street"
//             name="street"
//             value={formData.street}
//             onChange={handleInputChange}
//             required={false}
//           />
//         </Form.Group>
//         <br/>
//         <Form.Group controlId="formHouseNumber">
//           <Form.Label>House Number</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter your house number"
//             name="houseNumber"
//             value={formData.houseNumber}
//             onChange={handleInputChange}
//             required={false}
//           />
//         </Form.Group>
//         <Button variant="primary" type="submit" className='Sbsave'>
//           Save Changes
//         </Button>
//       </Form>
//     </div>
//   );
// }

// export default withLoader(Settings);



