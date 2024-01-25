
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import { useAuth } from './AuthContext';
import './scss/profile/profile.scss';
import withLoader from './loader/withLoader';
import ErrorPage from './ErrorPage';
import {Button } from 'react-bootstrap';


function Profile() { 
  
  const {token,logout} = useAuth();
  const [userInfo, setUserInfo] = useState(null);

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete(`http://localhost:8181/users/${jwtDecode(token)._id}`, {
        headers: {
          'x-auth-token': token,
        },
      });
      console.log('Account deleted successfully:', response.data);
      logout();
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  useEffect(() => {
    if (!token) {return;}
    const userId = jwtDecode(token)._id;
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8181/users/${userId}`,{
          headers: {
            'x-auth-token': token
          }
        });
      
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    
  
  fetchUserData();
  }, [token]);

  if (!userInfo) {
    return <div><ErrorPage /></div>;
  }
  return (
    <div className="ProfileContainer">
      <div className="Profile">
        <div className="ProfileContent">
          {userInfo.image.url && (
            <img
              className='profile-image'
              src={userInfo.image.url}
              alt={userInfo.image.alt || "User Image"}
              style={{ maxWidth: '100%', maxHeight: '300px' }}
            />
          )}

          {userInfo.name && (
            <>
              <p>Name: {userInfo.name.first}</p>
              <p>Lastname: {userInfo.name.last}</p>
            </>
          )}

          {userInfo.email && <p>Email: {userInfo.email}</p>}
          {userInfo.phone && <p>Phone: {userInfo.phone}</p>}
          {userInfo.image.alt && <p>ImageAlt: {userInfo.image.alt}</p>}
          {userInfo.isSeller && <p>Account is Seller {userInfo.isSeller}</p>}

          {userInfo.address && (
            <>
              {userInfo.address.country && <p>Country: {userInfo.address.country}</p>}
              {userInfo.address.city && <p>City: {userInfo.address.city}</p>}
              {userInfo.address.street && <p>Street: {userInfo.address.street}</p>}
              {userInfo.address.houseNumber && <p>House Number: {userInfo.address.houseNumber}</p>}
            </>
          )}
          <Button style={{marginBottom:'150px'}} onClick={handleDeleteAccount}>Delete Account</Button>
        </div>
      </div>
    </div>
  );
}


export default withLoader(Profile);