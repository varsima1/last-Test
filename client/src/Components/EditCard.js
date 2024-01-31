import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from './AuthContext';
import withLoader from './loader/withLoader';
import ErrorPage from './ErrorPage';
import { useParams,useNavigate} from 'react-router-dom';




function EditCard({ onCardUpdate }) {
  const nav = useNavigate()
  const { token, userObject } = useAuth();
  const params = useParams();
  const { cardId } = params;
  const [currency, setCurrency] = useState('USD');
  const [card, setCard] = useState({
    image: { url: '', alt: '' },
    subtitle: '',
    title: '',
    description: '',
    phone: '',
    price: 0,
    currency: 'USD',
    category: 'All',
  });

  useEffect(() => {
    const fetchCard = async () => {
      try {
        if (!cardId) {
          console.error('Card ID is undefined');
          return;
        }
  
        const response = await axios.get(`http://localhost:8181/cards/${cardId}`, {
          headers: {
            'x-auth-token': token,
          },
        });
        setCard(response.data);
      } catch (error) {
        console.error('Error fetching card details:', error);
      }
    };
  
    fetchCard();
  }, [cardId, token]);

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      if (!token || typeof token !== 'string') {
        throw new Error('Invalid user token');
      }

      const updatedCard = {
        image: {
          url: card.image.url,
          alt: card.image.alt,
        },
        subtitle: card.subtitle,
        title: card.title,
        description: card.description,
        phone: card.phone,
        price: card.price,
        currency: card.currency,
        category: card.category,
      };

      const response = await axios.put(`http://localhost:8181/cards/${cardId}`, updatedCard, {
        headers: {
          'x-auth-token': token,
        },
      });

      
      onCardUpdate(response.data);
    } catch (error) {
      console.error('Error updating card:', error.message);
    }
    nav('/market')
  };

  if (!userObject?.isSeller) {
    return <ErrorPage />;
  }
  if (!token) {
    return <ErrorPage />;
  }
  return (
    <div style={{marginBottom:'500px'}} className="card-container">
      <Form onSubmit={handleUpdate}>
        <h2>Edit Item Card</h2>
        <div>
          <label htmlFor='imageUrl'>Image URL:</label>
          <input
            type="text"
            id='imageUrl'
            value={card.image.url}
            onChange={(e) => setCard({ ...card, image: { ...card.image, url: e.target.value } })}
          />
        </div>
        <div>
          <label htmlFor='imageAlt'>Image ALT:</label>
          <input
            type="text"
            id='imageAlt'
            value={card.image.alt}
            onChange={(e) => setCard({ ...card, image: { ...card.image, alt: e.target.value } })}
          />
        </div>
        <div>
          <label htmlFor='title'>Title:</label>
          <textarea id='title' value={card.title} onChange={(e) => setCard({ ...card, title: e.target.value })} />
        </div>
        <div>
          <label htmlFor='subtitle'>Subtitle:</label>
          <textarea id='subtitle' value={card.subtitle} onChange={(e) => setCard({ ...card, subtitle: e.target.value })} />
        </div>
        <div>
          <label htmlFor='subtitle'>Description:</label>
          <textarea id='subtitle' value={card.description} onChange={(e) => setCard({ ...card, description: e.target.value })} />
        </div>
        <div>
          <label htmlFor='price'>Price:</label>
          <input type='number' value={card.price} onChange={(e) => setCard({ ...card, price: e.target.value })}/>
        </div>
        <div>
          <label htmlFor='currency'>Currency:</label>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
        <div>
          <Button type='submit'>Update Card</Button>
        </div>
      </Form>
    </div>
  );
  }
  
export default withLoader(EditCard);
