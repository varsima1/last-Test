import React, { useState } from 'react';
import withLoader from './loader/withLoader';
import axios from 'axios';
import { useAuth} from './AuthContext';
import ErrorPage from './ErrorPage';
import { Form, Button } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import './scss/MarketCreateCard/createCard.scss'

function MarketCreateCard({ onCardUpload }) {
  const {token,userObject} = useAuth();
  const [imageAlt, setImageAlt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('All');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [currency, setCurrency] = useState('USD');
  const [error, setError] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [title, setTitle] = useState('');
  const [phone, setPhone] = useState('');
  const isSeller = userObject?.isSeller;

  if (!isSeller) {
    return <ErrorPage />;
  }
  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!token || typeof token !== 'string') {
        throw new Error('Invalid user token');
      }
      if (
        !imageUrl ||
        !imageAlt ||
        !subtitle ||
        !title ||
        !description ||
        !phone ||
        isNaN(price) ||
        price <= 0
      ) {
        setError('Please fill in all fields with valid information.');
        return;
      } else {
        setError('');
      }

      const newCard = {
        image: {
          url: imageUrl, // Match the expected property name "url"
          alt: imageAlt,
        },
        subtitle, // Update this line to match the expected property name ("subtitle" instead of "title")
        title,    // Update this line to match the expected property name ("title" instead of "subtitle")
        description,
        phone,
        price,
        currency,
        category,
      };
      // console.log('User token before decoding:', token);
      // Decode the token to get user ID
      const userId = jwtDecode(token)._id;

      const response = await axios.post(`http://localhost:8181/cards`, newCard, {
        headers: {
          'x-auth-token': token,
        },
      });

      onCardUpload(response.data);
    } catch (error) {
      console.error('Error uploading card:', error.message);
      setError('Error uploading card. Please try again.');
    }
  };

  return (
    <div className="card-container">
    <Form onSubmit={onSubmit}>
      <h2>Item Card</h2>
      <div>
        <label htmlFor='imageUrl'>Image URL:</label>
        <input type="text" id='imageUrl' value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      </div>
      <div>
        <label htmlFor='imageAlt'>Image ALT:</label>
        <input type="text" id='imageAlt' value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} />
      </div>
      <div>
        <label htmlFor='title'>title:</label>
        <textarea id='title' value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label htmlFor='subtitle'>subtitle:</label>
        <textarea id='subtitle' value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
      </div>
      <div>
        <label htmlFor='category'>Category:</label>
        <select id='category' value={category} onChange={(e) => setCategory(e.target.value)}>
          {['All', 'Vechiles and Parts', 'Computers and Consoles', 'Headphones', 'Keyboards and Mouses', 'TVs', 'Tables'].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor='description'>Description:</label>
        <textarea id='description' value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
      <label htmlFor='Phone'>Phone:</label>
        <input type="number" id='Phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div>
        <label htmlFor='price'>Price:</label>
        <input type="number" id='price' value={price} onChange={(e) => setPrice(e.target.value)} />
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </div>
      <div>
        <Button type='submit'>Upload Card</Button>
      </div>
      </Form>
    </div>
  );
}

export default withLoader(MarketCreateCard);